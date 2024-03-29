const product = require("../schemas/productSchema");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const user = require("../schemas/userSchema");
const { validateMongodbId } = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user1;
  validateMongodbId(_id);
  try {
    if (req.body.title) {
      req.body.name = slugify(req.body.title);
    }
    let newProduct = await new product({
      title: req.body.title,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      quantity: req.body.quantity,
      sellerId: _id,
      images: req.body.images,
      color: req.body.color,
      tags: req.body.tags,
      ratings: req.body.ratings,
      sold: req.body.sold,
      totalrating: req.body.totalrating,
    }).save();
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const findProduct = await product.findById(id).populate("color");
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
  validateMongodbId(id);
  try {
    const updatedProduct = await product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});
const UpdateProductQuantity = asyncHandler(async (req, res) => {
  const { _id } = req.user1;
  quantity1 = req.body.productquantity?.quantity;
  sold1 = req.body.productquantity?.sold;
  pId = req.body.productquantity?.prodId;
  console.log(req.body.productquantity);
  validateMongodbId(_id);
  try {
    const updquantity = await product.findById(pId);
    updquantity.quantity = quantity1;
    updquantity.sold = sold1;

    updquantity.save();
    res.json(updquantity);
    // console.log(req.body.productquantity);
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

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user1;
  const { prodId } = req.body;
  try {
    let products = [];
    const user2 = await user.findById(_id);
    const alreadyadded = user2.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user3 = await user.findByIdAndUpdate(
        _id,
        { $pull: { wishlist: prodId } },
        { new: true }
      );
      res.json(user3);
    } else {
      let user3 = await user.findByIdAndUpdate(
        _id,
        { $push: { wishlist: prodId } },
        { new: true }
      );
      res.json(user3);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user1;
  const { star, comment, prodId } = req.body;
  try {
    const product2 = await product.findById(prodId);
    let alreadyrated = product2.ratings.find(
      (userId) => userId.postedBy.toString() === _id.toString()
    );
    if (alreadyrated) {
      const updateRating = await product.updateOne(
        { ratings: { $elemMatch: alreadyrated } },
        { $set: { "ratings.$.star": star, "ratings.$.comment": comment } },
        { new: true }
      );
      // res.json(updateRating);
    } else {
      const rateProduct = await product.findByIdAndUpdate(
        prodId,
        { $push: { ratings: { star: star, comment: comment, postedBy: _id } } },
        { new: true }
      );
      // res.json(rateProduct);
    }
    const getAllRatings = await product.findById(prodId);
    let totalRating = getAllRatings.ratings.length;
    let ratingsum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await product.findByIdAndUpdate(
      prodId,
      { totalrating: actualRating },
      { new: true }
    );
    res.json(finalproduct);
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
  addToWishlist,
  rating,
  UpdateProductQuantity,
};
