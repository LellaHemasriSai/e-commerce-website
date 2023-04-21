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
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  removeProductCart,
  UpdateProductQuantityCart,
  getMyOrders,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
} = require("../controller/userControl");
const { authentication, isAdmin } = require("../middlewares/authentication");
const {
  checkout,
  paymentVerification,
} = require("../controller/paymentControl");
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
router.post("/order/checkout", authentication, checkout);
router.post("/cart", authentication, userCart);

router.post("/order/paymentVerification", authentication, paymentVerification);
// router.post("/cart/applycoupon", authentication, applyCoupon);
router.post("/cart/create-order", authentication, createOrder);
router.get("/wishlist", authentication, getWishlist);
router.get("/all-users", getAllUsers);
router.get("/getmyorders", authentication, getMyOrders);
// router.get("/getallorders", authentication, isAdmin, getAllOrders);
// router.post("/getordersbyuser/:id", authentication, isAdmin, getOrderByUserId);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

router.get("/cart", authentication, getUserCart);
router.get("/getmonthwiseorderincome", authentication, getMonthWiseOrderIncome);
router.get("/getyearlytotalorders", authentication, getYearlyTotalOrders);
router.get("/:id", authentication, isAdmin, getAUser);
router.delete("/empty-cart", authentication, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authentication,
  removeProductCart
);
router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authentication,
  UpdateProductQuantityCart
);
router.delete("/:id", deleteAUser);
router.put("/edit-user", authentication, updateAUser);
router.put("/save-address", authentication, saveAddress);

module.exports = router;
