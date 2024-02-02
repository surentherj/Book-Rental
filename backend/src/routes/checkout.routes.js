"use strict";

const express = require("express");
const router = express.Router();

const checkoutController = require("../controllers/checkout.controller");
const { authorize } = require("../middleware/authorize");

router.get("/getcart", authorize, checkoutController.getcheckout);

router.post("/addorupdatecart", authorize, checkoutController.addorupdatecheckout);

module.exports = router;
