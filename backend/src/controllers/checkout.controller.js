"use strict";
const checkoutService = require("../services/checkout.service");

exports.addorupdatecheckout = async (req, res) => {
  checkoutService
    .addorupdatecheckout(req.body, req.headers.userid)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err?.status || 500).json({
        message: err?.message || `Error in adding/updating checkout`,
      });
    });
};

exports.getcheckout = async (req, res) => {
  checkoutService
    .getcheckout(req?.headers?.userid)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err?.status || 500).json({
        message: err?.message || `Error in getting checkout`,
      });
    });
};
