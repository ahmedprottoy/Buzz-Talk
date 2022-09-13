const express = require("express");
const authControl = require("../Controllers/authController");
const userBios = require("../users/userBiosRoute")
const {authentication} = require("../middleware/authenticateToken");
const test = require("../users/test");
const fileUpload = require("../middleware/fileUpload");

const router = express.Router();

router.post("/signUp", authControl.signUp);
router.post("/logIn", authControl.logIn);
router.post("/user/bios",authentication,fileUpload.upload.fields([
    { name:"profile" , maxCount: 1},
    { name: "cover", maxCount: 1}
]),userBios.createBios);
router.get("/test",authentication, fileUpload.upload.fields([
    { name:"profile" , maxCount: 1},
    { name: "cover", maxCount: 1}
]), test.getapi);

module.exports = router;
