const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const {
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouse,
  getAllwarehouse,
} = require("../controller/warehouseControl");
const router = express.Router();

router.post("/", authentication, isAdmin, createWarehouse);
router.put("/:id", authentication, isAdmin, updateWarehouse);
router.delete("/:id", authentication, isAdmin, deleteWarehouse);
router.get("/:id", getWarehouse);
router.get("/", getAllwarehouse);

module.exports = router;
