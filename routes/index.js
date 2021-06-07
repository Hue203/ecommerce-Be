const express = require("express");
const router = express.Router();
//// userApi
const userApi = require("./user.api");
router.use("/users", userApi);
module.exports = router;

//// authApi
const authApi = require("./auth.api");
router.use("/auth", authApi);

/// productApi
const productApi = require("./product.api");
router.use("/products", productApi);

//blogApi
const blogApi = require("./blog.api");
router.use("/blogs", blogApi);

//packageApi
const packageApi = require("./package.api");
router.use("/packages", packageApi);

//reviewApi
const reviewApi = require("./review.api");
router.use("/reviews", reviewApi);
module.exports = router;

//orderApi
const orderApi = require("./order.api");
router.use("/orders", orderApi);

///cycle Api

const cycleApi = require("./cycle.api");
router.use("/cycles", cycleApi);
