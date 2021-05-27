const express = require("express");
const router = express.Router();
const packageController = require("../controllers/package.cotroller");
const authMiddleware = require("../middleweares/authentication");
/**
 * @route GET api/packages
 * @description Get packages offering
 * @access Public
 */

router.get("/", packageController.getAllPackages);
/**
 * @route GET api/packages/:id
 * @description GET single packages
 * @access Public
 */
router.get("/:id", packageController.getSinglepackage);
/**
 * @route POST api/packages
 * @description Create packages
 * @access Admin required
 */
router.post(
  "/",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  packageController.createpackage
);
/**
 * @route PUT api/packages/:id
 * @description Update packages
 * @access Admin required
 */
router.put(
  "/:id",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  packageController.updatepackage
);
/**
 * @route DELETE api/packages/:id
 * @description Delete packages
 * @access Admin required
 */
router.delete(
  "/:id",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  packageController.deletepackage
);

module.exports = router;
