const reviewController = {};
const Review = require("../Models/Review");
const Product = require("../Models/Product");

reviewController.createReview = async (req, res, next) => {
  try {
    const userId = req.userId;
    const productId = req.params.id;
    console.log("productId", productId);
    const { content, vote } = req.body;
    const product = Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    let review = await Review.create({
      userId: userId,
      productId: productId,
      content,
      vote,
    });
    review = await review.populate("user").execPopulate();

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

reviewController.getReviewOfProduct = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const product = Product.findById(productId);
    if (!product) {
      throw new Error("Product not found", "get review error");
    }
    const totalReviews = await Review.countDocuments({ product: productId });
    const totalPages = Math.ceil(totalReviews / limit);
    const offset = limit * (page - 1);
    const reviews = await Review.find({ product: productId })
      .find(filter)
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: { reviews, totalPages },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

///Get single review
reviewController.getSingleReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);
    if (!review) {
      throw new Error("review not found", "Get Single review Error");
    }

    review = review.toJSON();

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

///Updatereview.
reviewController.updateReview = async (req, res, next) => {
  try {
    const userId = req.userId;
    const reviewId = req.params.id;
    const { content } = req.body;
    const review = await Review.findOneAndUpdate(
      { _id: reviewId },
      { userId: userId },
      {
        content,
      },

      { new: true }
    );
    if (!review) {
      throw new Error(
        "review not found or User not authorized",
        "Updated review Error"
      );
    }

    res.status(200).json({
      success: true,
      data: review,
      message: "review updated success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

///DeleteReview
reviewController.deleteReview = async (req, res, next) => {
  try {
    const userId = req.userId;
    const reviewId = req.params.id;

    const review = await Review.findOneAndDelete(
      { _id: reviewId, userId: userId },
      { isDeleted: true }
    );
    if (!review) {
      throw new Error(
        "review not found or User not authorized",
        "Delete review Error"
      );
    }

    res.status(200).json({
      success: true,
      data: null,
      message: "review delete success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
module.exports = reviewController;
