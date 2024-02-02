"use strict";

const express = require("express");
const router = express.Router();

const rentalController = require("../controllers/rental.controller");
const { authorize } = require("../middleware/authorize");

router.get("/getrental", authorize, rentalController.getrental);

router.post("/addorupdaterental", authorize, rentalController.addorupdaterental);

module.exports = router;
