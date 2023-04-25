const brand = require("../schemas/brandSchema.js");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");
// create a brand
const createbrand = asyncHandler(async (req, res) => {
  try {
    const newbrand = await brand.create(req.body);
    res.json(newbrand);
  } catch (error) {
    throw new Error(error);
  }
});
// update a brand
const updatebrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedbrand = await brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedbrand);
  } catch (error) {
    throw new Error(error);
  }
});
// delete a brand
const deletebrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedbrand = await brand.findByIdAndDelete(id);
    res.json(deletedbrand);
  } catch (error) {
    throw new Error(error);
  }
});
// get a single brand
const getbrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getbrand = await brand.findById(id);
    res.json(getbrand);
  } catch (error) {
    throw new Error(error);
  }
});
// get all brands
const getAllbrand = asyncHandler(async (req, res) => {
  try {
    const getallbrand = await brand.find();
    res.json(getallbrand);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createbrand,
  updatebrand,
  deletebrand,
  getbrand,
  getAllbrand,
};
