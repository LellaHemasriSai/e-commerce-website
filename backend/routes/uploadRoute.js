const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadControl");
const { isAdmin, authentication } = require("../middlewares/authentication");
const {
  uploadPhoto,
  productImageResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post(
  "/",
  authentication,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImages
);

router.delete("/delete-image/:id", authentication, isAdmin, deleteImages);

module.exports = router;
