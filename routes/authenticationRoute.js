const express = require("express");
const { createUser, loginControl } = require("../controller/userControl");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginControl);

module.exports = router;
