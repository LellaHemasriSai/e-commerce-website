const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
} = require("../controller/productControl");
const { isAdmin, authentication } = require("../middlewares/authentication");

const router = express.Router();

router.post("/", authentication, isAdmin, createProduct);

router.get("/:id", getProduct);
router.put("/wishlist", authentication, addToWishlist);
router.put("/rating", authentication, rating);
router.put("/:id", authentication, isAdmin, updateProduct);
router.delete("/:id", authentication, isAdmin, deleteProduct);
router.get("/", getAllProduct);

module.exports = router;
