const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    name: { type: String, required: true },
    products: [{ productId: { type: Schema.Types.ObjectId, ref: "Product" } }],
    images: [{ imageUrl: { type: String, require: true } }],
    packageType: {
      type: String,
      required: true,
    },
    cycle: {
      type: String,
      required: true,
    },
    quantity: { type: Number, required: true },
    price: {
      type: Number,
      required: true,
    },
    reviewsCount: { type: Number, default: 0 },
    voteCount: { type: Number, default: 0 },
    vote_average: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },

    /// co 2 options// fixed price -> Random drink
    /// cho user choose drink will caculated price and discount 20% on total
  },
  { timestamps: true }
);

const Package = mongoose.model("packages", packageSchema);
module.exports = Package;
