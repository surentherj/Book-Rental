"use strict";
const bookService = require("../services/book.service");

exports.addbook = async (req, res) => {
  bookService
    .addbook(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in adding a book`,
      });
    });
};

exports.getbook = async (req, res) => {
  bookService
    .getbook(req.query.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in getting a book`,
      });
    });
};

exports.updatebook = async (req, res) => {
  bookService
    .updatebook(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in updating a book`,
      });
    });
};

exports.getbooklist = async (req, res) => {
  bookService
    .getbooklist(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in getting list of books`,
      });
    });
};
