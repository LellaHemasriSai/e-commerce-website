const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
  deleteImages,
} = require("../controller/productControl");
const { isAdmin, authentication } = require("../middlewares/authentication");
const {
  uploadPhoto,
  productImageResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authentication, isAdmin, createProduct);
router.put(
  "/upload",
  authentication,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImages
);
router.get("/:id", getProduct);
router.put("/wishlist", authentication, addToWishlist);
router.put("/rating", authentication, rating);
router.put("/:id", authentication, isAdmin, updateProduct);
router.delete("/:id", authentication, isAdmin, deleteProduct);
router.delete("/delete-image/:id", authentication, isAdmin, deleteImages);
router.get("/", getAllProduct);

module.exports = router;
