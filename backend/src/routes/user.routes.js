"use strict";

const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { authorize } = require("../middleware/authorize");

router.post("/getResetPasswordLink", userController.getResetPasswordLink);

router.post("/verifyResetPasswordLink", userController.verifyResetPasswordLink);

router.post("/resetPassword", userController.resetPassword);

router.post("/login", userController.login);

router.post("/register", userController.register);

router.get("/", authorize, userController.getUserInformation);

module.exports = router;
