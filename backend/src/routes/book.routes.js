"use strict";

const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller");
const { authorize } = require("../middleware/authorize");

router.get("/getbook", authorize, bookController.getbook);

router.post("/addbook", authorize, bookController.addbook);

router.post("/updatebook", authorize, bookController.updatebook);

router.post("/getbooklist", authorize, bookController.getbooklist);

module.exports = router;
