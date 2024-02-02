const nodemailer = require("nodemailer");
const config = require("../config/config");

exports.sendMailForAuthentication = (subject, message, toList) => {
  const transporter = nodemailer.createTransport({
    host: config.mailer.smtpServer,
    port: config.mailer.smtpPort,
    secureConnection: false,
    pool: true,
    maxConnections: 3,
    tls: { ciphers: "SSLv3" },
    auth: {
      user: config.mailer.usermail,
      pass: config.mailer.password,
    },
  });
  const mailOptions = {
    from: config.mailer.usermail,
    to: toList.join(","),
    subject,
    html: message,
  };
  transporter.sendMail(mailOptions, async (err, success) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Mail Sent Successfully");
    }
  });
};
