const express = require("express");
const authControl = require("../Controllers/authController");

const router = express.Router();

router.post("/signUp", authControl.signUp);
router.post("/logIn", authControl.logIn);

module.exports = router;
