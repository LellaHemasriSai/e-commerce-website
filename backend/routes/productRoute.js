const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productControl");
const { isAdmin, authentication } = require("../middlewares/authentication");
const router = express.Router();

router.post("/", authentication, isAdmin, createProduct);
router.get("/:id", getProduct);
router.put("/:id", authentication, isAdmin, updateProduct);
router.delete("/:id", authentication, isAdmin, deleteProduct);
router.get("/", getAllProduct);

module.exports = router;
