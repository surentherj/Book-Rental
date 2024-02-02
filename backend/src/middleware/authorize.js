"use strict";
const jwt = require("jwt-decode");

function isTokenExpired(decoded) {
  try {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decoded?.exp < currentTimestamp) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return true;
  }
}

exports.authorize = async (req, res, next) => {
  if (req?.headers?.authorization) {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    const decoded = jwt(token);
    if (isTokenExpired(decoded)) {
      return res
        .status(500)
        .json({ code: "logout", error: "Bearer Token Expired" });
    }
    req.headers["username"] = decoded.unique_name;
    req.headers["useremail"] = decoded.given_name;
    req.headers["userid"] = decoded.user_id;
  }
  next();
};
