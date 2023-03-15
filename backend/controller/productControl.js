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
  // console.log(req.query);
  // const { id } = req.params;
  try {
    const obj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete obj[el]);
    // console.log(obj, req.query);

    let str = JSON.stringify(obj);
    str = str.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(str));
    let query1 = product.find(JSON.parse(str));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query1 = query1.sort(sortBy);
    } else {
      query1 = query1.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query1 = query1.select(fields);
    } else {
      query1 = query1.select("-__v");
    }

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query1 = query1.skip(skip).limit(limit);
    if (req.query.page) {
      const count = await product.countDocuments();
      if (skip >= count) {
        throw new Error("Page doesnot exists!!");
      }
    }

    // const getallProducts = await product.find(obj);
    const getallProducts = await query1;
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
