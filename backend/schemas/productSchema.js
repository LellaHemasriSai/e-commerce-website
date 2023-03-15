const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Category",
      type: String,
      required: true,
    },
    brand: {
      // type: String,
      // enum: ["Apple", "Lenovo", "Samsung"],
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
    },
    color: {
      // type: String,
      // enum: ["Black", "Brown", "Red"],
      type: String,
      required: true,
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    sold: {
      type: Number,
      default: 0,
      // select: false,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("product", productSchema);
