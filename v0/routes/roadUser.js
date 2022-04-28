const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/ctrUser");

router.post("/login", userCtrl.login);

router.post("/signup", userCtrl.signUp);

module.exports = router;

//router.post("/signup", userCtrl.signup);
