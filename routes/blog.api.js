const express = require("express");
const blogController = require("../controllers/blog.controller");
const router = express.Router();
const authMiddleware = require("../middleweares/authentication");
/**
 * @route GET api/blogs?page=1&limit=10
 * @description Get  blogs with pagination
 * @access Public
 */
router.get("/", blogController.getAllBlog);

/**
 * @route GET api/blogs/:id
 * @description GET single blog
 * @access Public
 */
router.get("/:id", blogController.getSingleBlog);
/**
 * @route POST api/blogs
 * @description Create blog
 * @access Admin required
 */
router.post(
  "/",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  blogController.createBlog
);
/**
 * @route PUT api/blogs/:id
 * @description Update blog
 * @access Admin required
 */
router.put(
  "/:id",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  blogController.updateBlog
);
/**
 * @route DELETE api/blogs/:id
 * @description Delete blog
 * @access Admin required
 */
router.delete(
  "/:id",
  authMiddleware.loginrequired,
  authMiddleware.adminRequired,
  blogController.deleteblog
);
module.exports = router;
