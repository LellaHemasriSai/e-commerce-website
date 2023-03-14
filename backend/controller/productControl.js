const product = require("../schemas/productSchema");
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getallProducts = await product.find();
    res.json(getallProducts);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createProduct, getProduct, getAllProduct };
