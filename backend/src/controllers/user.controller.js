"use strict";
const jwtToken = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-decode");
const users = require("../model/user.model");
const { upsertData } = require("../utils/mongo/mongoDao");
const {
  sendMailForAuthentication,
} = require("../services/notification.service");
const { resetPasswordTemplate } = require("../templates/mailTemplates");
const { getcheckout } = require("../services/checkout.service");
const { getrental } = require("../services/rental.service");

exports.getUserInformation = async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1] !== undefined
  ) {
    const token = req.headers.authorization.split(" ")[1];
    let email,
      obj = {
        loginFailedAttempts: 0,
      };
    const decoded = jwt(token);
    email = decoded.unique_name;

    let { response: userDetails } = await upsertData({ email }, users, obj);
    let basicAuthObj = {
      unique_name: email,
      given_name: userDetails.name,
      user_id: userDetails.id,
    };
    res.status(200).json({
      name: userDetails.name,
      email,
      addBook: email === "15692@suren.com" ? true : false,
      checkout: await getcheckout(userDetails.id),
      rental: await getrental(userDetails.id),
      token: jwtToken.sign(basicAuthObj, "!Q@W#E$R%T^Y&U*I(O)P", {
        expiresIn: "90m",
      }),
      userId: userDetails._id,
    });
  }
};

exports.getResetPasswordLink = async (req, res) => {
  const { email } = req.body;
  let emailObj = {
    email: {
      $regex: email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      $options: "i",
    },
  };
  let user = await users.findOne(emailObj);
  if (!user) {
    return res.status(500).json({
      message: "User email address not registered in our application",
    });
  }
  try {
    const uuid = uuidv4();
    await sendMailForAuthentication(
      "Online Book Rental Library Reset Password",
      resetPasswordTemplate(user.name, uuid),
      [user.email]
    );
    await upsertData({ email: user.email }, users, {
      resetPasswordToken: {
        code: uuid,
        expiration: this.addOrSubMinutesToDate(new Date(), 20),
      },
    });
    res.status(200).json({
      message: "Password rest link sent to Email",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Error in sending password reset mail, please try after sometime.",
    });
  }
};

exports.verifyResetPasswordLink = async (req, res) => {
  const { resetPasswordToken } = req.body;
  let user = await users.findOne({
    "resetPasswordToken.code": resetPasswordToken,
  });
  if (!user) {
    return res.status(500).json({
      message: "Reset Password Token Expired!",
    });
  }
  if (
    user?.resetPasswordToken?.expiration &&
    new Date(user?.resetPasswordToken?.expiration) < new Date()
  ) {
    await upsertData({ email: user.email }, users, { resetPasswordToken: {} });
    return res.status(500).json({
      message: "Reset Password Token Expired!",
    });
  }
  res.status(200).json({
    email: user.email,
  });
};

exports.resetPassword = async (req, res) => {
  const { resetPasswordToken, newPassword, confirmPassword } = req.body;
  if (!resetPasswordToken || !newPassword || !confirmPassword) {
    return res.status(500).json({
      message: "Invalid request!",
    });
  }
  let user = await users.findOne({
    "resetPasswordToken.code": resetPasswordToken,
  });
  if (!user) {
    return res.status(500).json({
      message: "Reset Password Token Expired!",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(500).json({
      message: "New Password should match with confirm password!",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(newPassword, salt);
  await upsertData({ "resetPasswordToken.code": resetPasswordToken }, users, {
    resetPasswordToken: {},
    password,
    loginFailedAttempts: 0,
  });
  res.status(200).json({
    message: "Password changes successfully!",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      code: "logout",
      message: "Invalid request!",
    });
  }
  let user = await users.findOne({
    email: {
      $regex: email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      $options: "i",
    },
  });
  if (!user) {
    return res.status(500).json({
      message: "Invalid Credentials",
    });
  }
  if ((user?.loginFailedAttempts || 0) > 4) {
    return res.status(500).json({
      message:
        "Account locked due to multiple login fails. Please use forgot password!",
    });
  }
  if (!user?.password) {
    return res.status(500).json({
      message: "Password not set for your account. Please use forgot password!",
    });
  }
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    await upsertData({ email: user.email }, users, {
      loginFailedAttempts: (user?.loginFailedAttempts || 0) + 1,
    });
    return res.status(500).json({ message: "Invalid Credentials" });
  }
  await upsertData({ email: user.email }, users, {
    loginFailedAttempts: 0,
  });
  let obj = {
    unique_name: user.email,
    user_id: user.id,
    given_name: user.name,
    addBook: user.email === "15692@suren.com" ? true : false,
  };
  const token = jwtToken.sign(obj, "!Q@W#E$R%T^Y&U*I(O)P", {
    expiresIn: "90m",
  });
  res.status(200).json({
    name: user.name,
    email: user.email,
    token,
  });
};

exports.addOrSubMinutesToDate = (dateTime, value, type) => {
  value = Number(value);
  if (type === "Days") {
    value = value * 24 * 60;
  } else if (type === "Hours") {
    value = value * 60;
  }
  const newDate = new Date(dateTime);
  newDate.setMinutes(newDate.getMinutes() + value);
  if (type === "Days") {
    return newDate.toISOString().slice(0, 10);
  }
  return newDate.toISOString();
};

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(500).json({
      code: "500",
      message: "Invalid request!",
    });
  }
  let user = await users.findOne({
    email: {
      $regex: email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      $options: "i",
    },
  });
  if (user) {
    return res.status(500).json({
      message: "Email Already Used!...",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const bcryptPass = await bcrypt.hash(password, salt);
  await upsertData({ email }, users, {
    email,
    name,
    password: bcryptPass,
    loginFailedAttempts: 0,
  });
  res.status(200).json({
    message: "User Registered Successfully",
  });
};
