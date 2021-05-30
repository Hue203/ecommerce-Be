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
router.get("/", authMiddleware.loginrequired, orderController.getAllOrders);
/**
 * @route GET api/orders/mine
 * @description GET current user order
 * @acces Login required
 */
router.get(
  "/mine",
  authMiddleware.loginrequired,
  orderController.getCurrentUserOrder
);
/**
 * @route GET api/orders/:id
 * @description GET single order
 * @acces Login required
 */

router.get(
  "/:id",
  authMiddleware.loginrequired,
  orderController.getSingleOrder
);
/**
 * @route PUT api/orders/:id
 * @description User, admin update order,
 * @acces Login required
 */
router.put("/:id", authMiddleware.loginrequired, orderController.updateOrder);
/**
 * @route DELETE api/orders/:id
 * @description User,admin delete/cancel order
 * @acces Login required
 */
router.delete(
  "/:id",

  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  orderController.deleteOrder
);

module.exports = router;
