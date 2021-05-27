const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();
const authMiddleware = require("../middleweares/authentication");
/**
 * @route GET api/products?page=1&limit=10
 * @description Get  products with pagination
 * @access Public
 */
router.get("/", productController.getAllProducts);

/**
 * @route GET api/products/:id
 * @description GET single product
 * @access Public
 */
router.get("/:id", productController.getSingleProduct);
/**
 * @route POST api/products
 * @description Create product
 * @access Admin required
 */
router.post(
  "/",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  productController.createProduct
);
/**
 * @route PUT api/products/:id
 * @description Update product
 * @access Admin required
 */
router.put(
  "/:id",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  productController.updateProduct
);
/**
 * @route DELETE api/products/:id
 * @description Delete product
 * @access Admin required
 */
router.delete(
  "/:id",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  productController.deleteProduct
);
module.exports = router;
