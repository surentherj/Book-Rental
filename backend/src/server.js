"use strict";

const path = require("path");

require("dotenv").config({
  path: path.join(__dirname + `/../.env`),
});

require("./loaders/mongoose")();

const config = require("./config/config");
const app = require("./loaders/express")();

const server = app
  .get("server")
  .listen(process.env.NODEJS_PORT, config.hostname, () => {
    console.log(
      `${config.app.title} started on ${config.hostname}:${
        process.env.NODEJS_PORT
      } in ${process.env.NODE_ENV} mode on ${new Date()}`
    );
  });

const exitHandler = (msgCase) => {
  if (server) {
    server.close(() => {
      console.log(`${config.app.title} closed due to ${msgCase}`);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception", error);
  exitHandler("Uncaught Exception");
});

process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection", error);
  exitHandler("Unhandled Rejection");
});

process.on("SIGTERM", () => {
  console.log(`SIGTERM received`);
  if (server) {
    server.close();
  }
});
