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
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
} = require("../controller/userControl");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put(
  "/order/update-order/:id",
  authentication,
  isAdmin,
  updateOrderStatus
);
router.put("/password", authentication, updatePassword);
router.post("/login", loginControl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authentication, userCart);
router.post("/cart/applycoupon", authentication, applyCoupon);
router.post("/cart/cash-order", authentication, createOrder);
router.get("/all-users", getAllUsers);
router.get("/get-orders", authentication, getOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authentication, getWishlist);
router.get("/cart", authentication, getUserCart);
router.get("/:id", authentication, isAdmin, getAUser);
router.delete("/empty-cart", authentication, emptyCart);
router.delete("/:id", deleteAUser);
router.put("/edit-user", authentication, updateAUser);
router.put("/save-address", authentication, saveAddress);

module.exports = router;
