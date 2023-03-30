const express = require("express");
const {
  createUser,
  loginControl,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} = require("../controller/userControl");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authentication, updatePassword);
router.post("/login", loginControl);
router.post("/get-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authentication, isAdmin, getAUser);
router.delete("/:id", deleteAUser);
router.put("/edit-user", authentication, updateAUser);

module.exports = router;
