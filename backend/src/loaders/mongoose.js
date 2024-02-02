"use strict";

const mongoose = require("mongoose");

const config = require("../config/config");

module.exports = () => {
  mongoose
    .connect(config.mongoDB.DB_URI, config.mongoDB.OPTIONS)
    .then(() => {
      console.log(`Connected to mongoose database at ${config.mongoDB.DB_URI}`);
    })
    .catch((error) => {
      console.log(error);
    });
};
