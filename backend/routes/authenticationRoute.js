const express = require("express");
const {
  createUser,
  loginControl,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
} = require("../controller/userControl");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginControl);
router.post("/get-users", getAllUsers);
router.get("/:id", getAUser);
router.delete("/:id", deleteAUser);
router.put("/:id", updateAUser);

module.exports = router;
