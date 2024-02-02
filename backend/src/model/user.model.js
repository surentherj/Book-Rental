"use strict";

const mongoose = require("mongoose");

const config = require("../config/config");

const conn = mongoose.createConnection(
  config.mongoDB.DB_URI,
  config.mongoDB.OPTIONS
);

const toJSON = require("./plugins/toJson.plugin");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobilePhone: {
      type: String,
    },
    loginFailedAttempts: {
      type: Number,
      default: 0,
    },
    resetPasswordToken: {
      code: {
        type: String,
      },
      expiration: {
        type: Date,
      },
    },
    password: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);

const users = conn.model("users", userSchema);

module.exports = users;
