const express = require("express");
const router = express.Router();
const cycleController = require("../controllers/cycle.controller");
const authMiddleware = require("../middleweares/authentication");
/**
 * @route POST api/cycles
 * @description create cycles
 * @access adminRequired
 */

router.post(
  "/",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  cycleController.createCycle
);

/**
 * @route Get api/cycles
 * @description Get cycles
 * @access Public
 */

router.get("/", cycleController.getCycle);
module.exports = router;
