const express = require("express");
const {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controller/couponControl");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/", authentication, isAdmin, createCoupon);
router.get("/", authentication, isAdmin, getAllCoupon);
router.put("/:id", authentication, isAdmin, updateCoupon);
router.delete("/:id", authentication, isAdmin, deleteCoupon);

module.exports = router;
