const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./Product");
const reviewSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    vote: { type: Number, min: 0, max: 5 },
    isDeleted: { type: Boolean, default: false },
    ///user da order sp nay moi dc review//
  },
  { timestamps: true }
);

reviewSchema.statics.calculateReviews = async function (productId) {
  const reviewCount = await this.find({ porduct: productId }).countDocuments();
  await Product.findByIdAndUpdate(productId, { reviewCount: reviewCount });
};
reviewSchema.post("save", async function () {
  await this.constructor.calculateReviews(this.porduct);
});
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function (next) {
  await this.doc.constructor.calculateReviews(this.doc.porduct);
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
