const product = require("../schemas/productSchema");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.name = slugify(req.body.title);
    }
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
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.name = slugify(req.body.title);
    }
    const updateProduct = await product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await product.findByIdAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
