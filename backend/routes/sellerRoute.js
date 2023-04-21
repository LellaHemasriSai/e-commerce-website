const express = require("express");
const createSeller = require("../controller/sellerControl");
const { authentication, isAdmin } = require("../middlewares/authentication");

const router = express.Router();

router.post("/register", createSeller);
module.exports = router;
