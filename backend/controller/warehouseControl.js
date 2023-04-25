const warehouse = require("../schemas/warehouseSchema.js");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");

const createWarehouse = asyncHandler(async (req, res) => {
  try {
    const newwarehouse = await warehouse.create(req.body);
    res.json(newwarehouse);
  } catch (error) {
    throw new Error(error);
  }
});

const updateWarehouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedwarehouse = await warehouse.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedwarehouse);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteWarehouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedwarehouse = await warehouse.findByIdAndDelete(id);
    res.json(deletedwarehouse);
  } catch (error) {
    throw new Error(error);
  }
});

const getWarehouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getwarehouse = await warehouse.findById(id);
    res.json(getwarehouse);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllwarehouse = asyncHandler(async (req, res) => {
  try {
    const getallwarehouse = await warehouse.find();
    res.json(getallwarehouse);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouse,
  getAllwarehouse,
};
