const color = require("../schemas/colorSchema.js");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");

// create a color
const createcolor = asyncHandler(async (req, res) => {
  try {
    const newcolor = await color.create(req.body);
    res.json(newcolor);
  } catch (error) {
    throw new Error(error);
  }
});

// update a color
const updatecolor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedcolor = await color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedcolor);
  } catch (error) {
    throw new Error(error);
  }
});

// delete a color
const deletecolor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedcolor = await color.findByIdAndDelete(id);
    res.json(deletedcolor);
  } catch (error) {
    throw new Error(error);
  }
});

// get a single color
const getcolor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getcolor = await color.findById(id);
    res.json(getcolor);
  } catch (error) {
    throw new Error(error);
  }
});

// get all colors
const getAllcolor = asyncHandler(async (req, res) => {
  try {
    const getallcolor = await color.find();
    res.json(getallcolor);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createcolor,
  updatecolor,
  deletecolor,
  getcolor,
  getAllcolor,
};
