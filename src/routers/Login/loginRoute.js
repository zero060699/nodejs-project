const express = require("express");
const router = express.Router();

const loginController = require("../../app/controllers/loginController");

router.post("/createLogin", loginController.createUser);

module.exports = router;