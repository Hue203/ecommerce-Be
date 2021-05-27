const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const authMiddleware = require("../middleweares/authentication");
/**
 *  @route GET api/reviews/products/:id?page=1&limit=10
 * @description Get reviews from a product
 * @acces Public
 */
router.get(
  "/products/:id",
  authMiddleware.loginrequired,
  reviewController.getReviewOfProduct
);
/**
 *  @route POST api/reviews/products/:id
 * @description Create review for a product
 * @acces Login required
 */
router.post(
  "/products/:id",
  authMiddleware.loginrequired,
  reviewController.createReview
);

/**
 *  @route PUT api/reviews/:id
 * @description Edit review
 * @acces Login required
 */
router.put("/:id", authMiddleware.loginrequired, reviewController.updateReview);
/**
 *  @route DELETE api/reviews/:id
 * @description Delete review
 * @acces Login required
 */

router.delete(
  "/:id",
  authMiddleware.loginrequired,
  reviewController.deleteReview
);
module.exports = router;
