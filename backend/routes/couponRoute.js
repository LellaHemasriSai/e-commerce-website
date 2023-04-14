const express = require("express");
const {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupon,
} = require("../controller/couponControl");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/", authentication, isAdmin, createCoupon);
router.get("/", authentication, isAdmin, getAllCoupon);
router.get("/:id", authentication, isAdmin, getCoupon);
router.put("/:id", authentication, isAdmin, updateCoupon);
router.delete("/:id", authentication, isAdmin, deleteCoupon);

module.exports = router;
