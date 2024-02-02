"use strict";
const config = require("../config/config");

exports.getProductDetails = async (req, res) => {
  res.status(200).json({
    "Product Name": config.app.title,
    "Product Version": config.app.version,
    "Product Description": config.app.description,
  });
};
