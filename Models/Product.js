const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    catagories: {
      type: String,
      required: true,
      enum: ["fresh", "dried", "cereal"],
    },
    service: {
      type: String,
      required: true,
      enum: ["fixed-drink", "make-your-own"],
      default: "fixed-drink",
    },
    ingredients: { type: String, required: true }, /// neu ma order fixed thi co san
    description: { type: String, required: true },
    recipes: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: [{ imageUrl: { type: String } }],
    reviewsCount: { type: Number, default: 0 },
    voteCount: { type: Number, default: 0 },
    vote_average: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
