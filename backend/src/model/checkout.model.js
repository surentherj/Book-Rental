"use strict";

const mongoose = require("mongoose");

const config = require("../config/config");

const conn = mongoose.createConnection(
  config.mongoDB.DB_URI,
  config.mongoDB.OPTIONS
);

const toJSON = require("./plugins/toJson.plugin");
const users = require("./user.model");

const checkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: users,
      unique: true,
    },
    books: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

checkoutSchema.plugin(toJSON);

const checkouts = conn.model("checkouts", checkoutSchema);

module.exports = checkouts;
