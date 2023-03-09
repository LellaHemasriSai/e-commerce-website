const mongoose = require("mongoose");
const validateMongodbId = (id) => {
  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    throw new Error("This is not a valid ID");
  }
};

module.exports = { validateMongodbId };
