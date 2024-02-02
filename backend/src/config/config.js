"use strict";

module.exports = {
  app: {
    title: "Book Rental",
    version: "1.0.0",
    description: "Online Book Rental Library",
    url: process.env.REDIRECT_URL,
  },
  hostname: "localhost",
  mongoDB: {
    DB_URI: process.env.MONGODB_URI.replace("WebOrigin", process.env.WebOrigin),
    OPTIONS: {},
  },
  mailer: {
    smtpPort: 587,
    smtpServer: process.env.SMTP_SERVER,
    usermail: process.env.SMTP_MAIL_ID,
    password: process.env.SMTP_MAIL_PASSWORD,
  },
};
