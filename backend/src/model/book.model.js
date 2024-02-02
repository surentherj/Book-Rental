"use strict";

const mongoose = require("mongoose");

const config = require("../config/config");

const conn = mongoose.createConnection(
  config.mongoDB.DB_URI,
  config.mongoDB.OPTIONS
);

const toJSON = require("./plugins/toJson.plugin");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Array,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    expextedNextAvaildate: {
      type: Date,
      default: null,
    },
    costPerDay: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3VPC33__GmaEsNnL25TBYb1NgJ84IIcyZbCNGh95Alg&s",
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.plugin(toJSON);

const books = conn.model("books", bookSchema);

module.exports = books;
