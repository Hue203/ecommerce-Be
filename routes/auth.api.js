const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
/**
 *  @route POST api/auth/login
 * @description Login
 * @acces Public
 */
router.post("/login", authController.loginWithEmail);
/**
 *  @route POST api/auth/login/facebook
 * @description Login with Facebook
 * @acces Public
 */

/**
 *  @route POST api/auth/login/google
 * @description Login with google
 * @acces Public
 */
module.exports = router;
