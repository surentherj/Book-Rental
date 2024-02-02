"use strict";
const rentalService = require("../services/rental.service");

exports.addorupdaterental = async (req, res) => {
  rentalService
    .addorupdaterental(req.body, req.headers.userid)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err?.status || 500).json({
        message: err?.message || `Error in adding/updating rental`,
      });
    });
};

exports.getrental = async (req, res) => {
  rentalService
    .getrental(req?.headers?.userid)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err?.status || 500).json({
        message: err?.message || `Error in getting rental`,
      });
    });
};
