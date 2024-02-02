"use strict";

const mongoose = require("mongoose");

const config = require("../config/config");

const conn = mongoose.createConnection(
  config.mongoDB.DB_URI,
  config.mongoDB.OPTIONS
);

const toJSON = require("./plugins/toJson.plugin");
const users = require("./user.model");

const rentalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: users,
  },
  books: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

rentalSchema.plugin(toJSON);

const rentals = conn.model("rentals", rentalSchema);

module.exports = rentals;
