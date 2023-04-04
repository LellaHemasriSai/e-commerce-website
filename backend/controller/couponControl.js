const coupon = require("../schemas/couponSchema");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const coupons = await coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatecoupon = await coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletecoupon = await coupon.findByIdAndDelete(id, req.body);
    res.json(deletecoupon);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createCoupon, getAllCoupon, updateCoupon, deleteCoupon };
