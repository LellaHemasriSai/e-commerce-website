const express = require("express");
const {
  createUser,
  loginControl,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
} = require("../controller/userControl");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginControl);
router.post("/get-users", getAllUsers);
router.get("/:id", authentication, getAUser);
router.delete("/:id", deleteAUser);
router.put("/:id", updateAUser);

module.exports = router;
