const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { loginrequired } = require("../middleweares/authentication");
const authMiddleware = require("../middleweares/authentication");

/**
 * @route GET api/users/profit
 * @description profit data
 * @acces Login Required, admin
 
 */
router.get(
  "/profit",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  userController.getProfit
);

/**
 * @route POST api/users
 * @description User register account
 * @acces Public
 *
 */
router.post("/", userController.register);

/**
 *  @route GET api/users
 * @description Return current user infor
 * @acces Login Required
 */
router.get(
  "/",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  userController.getUsers
);
/**
 *  @route GET api/users/me
 * @description Return current user infor
 * @acces Login Required
 */
router.get("/me", authMiddleware.loginrequired, userController.getCurrentUser);

/**
 * @route PUT api/users/me
 * @description User can update profile
 * @acces Login Required
 */

router.put(
  "/shipping",
  authMiddleware.loginrequired,
  userController.updateBillingAddress
);
/**
 * @route PUT api/users/cart
 * @description User can add product to cart
 * @acces Login Required
 */

router.put(
  "/cart",
  authMiddleware.loginrequired,
  userController.updateUserCart
);

/**
 * @route PUT api/users/cart/quantity
 * @description User can add qunatity to cart
 * @acces Login Required
 */

router.put(
  "/cart/quantity",
  authMiddleware.loginrequired,
  userController.updateItemCart
);
/**
 * @route PUT api/users/cart/delete
 * @description User can add qunatity to cart
 * @acces Login Required
 */

router.put(
  "/cart/delete",
  authMiddleware.loginrequired,
  userController.deleteItemCart
);

/**
 * @route PUT api/users/cart/package
 * @description User can add package to packagecart
 * @acces Login Required
 */

router.put(
  "/package",
  authMiddleware.loginrequired,
  userController.updateUserPackage
);

/**
 * @route PUT api/users/package/quantity
 * @description User can edit quantity package
 * @acces Login Required
 */

router.put(
  "/package/quantity",
  authMiddleware.loginrequired,
  userController.updateItemPackage
);
/**
 * @route PUT api/users/package/quantity
 * @description User can edit quantity package
 * @acces Login Required
 */

router.get(
  "/package",
  authMiddleware.loginrequired,
  userController.getCurrentUser
);

/**
 * @route GET api/users/:id/cart
 * @description User can get cart
 * @acces Login Required
 */
router.get(
  "/cart",
  authMiddleware.loginrequired,
  userController.getCurrentUser
);
/**
 * @route GET api/users/cart
 * @description Return list orders of current user
 * @acces Admin Authorized
 */

router.get(
  "/:id/orders",

  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  userController.getCurrentUserOrder
);

/**
 * @route GET api/users/:id/orders/:id
 * @description Get Single order of current user
 * @acces  Admin Authorized
 */
router.get(
  "/:id/orders/:id",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired
);
/**
 * @route PUT api/users/:id/orders/:id
 * @description Admin update status order of current user
 * @acces  Admin Authorized
 */
router.put(
  "/:id/orders/:id",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired
);
/**
 * @route DELETE api/users/:id/orders/:id
 * @description Admin can delete/cancel order of current user
 * @acces  Admin Authorized
 */
router.delete(
  "/:id/orders/:id",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired
);
/**
 * @route GET api/users/orders/:id/payment
 * @description User can make a payment
 * @acces Login Required
 */
router.get(
  "/orders/:id/payment",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired
);
/**
 * @route PUT api/users
 * @description User update profile
 * @acces Login Required
 
 */
router.put("/", authMiddleware.loginrequired, userController.updateProfile);

module.exports = router;
