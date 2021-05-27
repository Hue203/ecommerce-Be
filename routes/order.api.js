const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleweares/authentication");
const orderController = require("../controllers/order.cotroller");

/**
 * @route POST api/orders
 * @description User can create an order
 * @acces Login required
 */
router.post("/", authMiddleware.loginrequired, orderController.createOrder);
/**
 * @route GET api/orders?page=1&limit=10
 * @description GET list orders with pagination
 * @acces Login required
 */
router.get("/", authMiddleware.loginrequired, orderController.getAllorders);

/**
 * @route GET api/orders/:id
 * @description GET single order
 * @acces Login required
 */

router.get(
  "/:id",
  authMiddleware.loginrequired,
  orderController.getSingleorder
);
/**
 * @route PUT api/orders/:id
 * @description User, admin update order,
 * @acces Login required
 */
router.put("/:id", authMiddleware.loginrequired, orderController.updateorder);
/**
 * @route DELETE api/orders/:id
 * @description User,admin delete/cancel order
 * @acces Login required
 */
router.delete(
  "/:id",

  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  orderController.deleteorder
);

module.exports = router;
