const express = require("express");
const {
  createUser,
  loginControl,
  getAllUsers,
  getAUser,
  deleteAUser,
} = require("../controller/userControl");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginControl);
router.post("/get-users", getAllUsers);
router.get("/:id", getAUser);
router.delete("/:id", deleteAUser);

module.exports = router;
