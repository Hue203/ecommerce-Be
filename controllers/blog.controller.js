const blogController = {};
const Blog = require("../Models/Blog");

blogController.getAllBlog = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalBlogs = await Blog.count({ ...filter, isDeleted: false });
    const totalPages = Math.ceil(totalBlogs / limit);
    const offset = limit * (page - 1);
    const blogs = await Blog.find(filter)
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: { blogs, totalPages },
      message: "Get all blog success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
blogController.createBlog = async (req, res, next) => {
  try {
    const userId = req.userId;
    let { title, content, blogImage } = req.body;
    let blog = await Blog.create({ userId: userId, title, content, blogImage });
    res.status(200).json({
      success: true,
      data: blog,
      message: "Create Blog success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

blogController.getSingleBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      throw new Error("blog not found", "Get Single blog Error");
    }

    blog = blog.toJSON();

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
///update blog

blogController.updateBlog = async (req, res, next) => {
  try {
    const userId = req.userId;
    const blogId = req.params.id;
    const { title, content, blogImage } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      blogId,

      {
        title,
        content,
        blogImage,
      },

      { new: true }
    );
    if (!blog) {
      throw new Error(
        "blog not found or User not authorized",
        "Updated blog Error"
      );
    }

    res.status(200).json({
      success: true,
      data: blog,
      message: "blog updated success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
///Detelete blog

blogController.deleteblog = async (req, res, next) => {
  try {
    const userId = req.userId;
    const blogId = req.params.id;

    const blog = await Blog.findOneAndDelete(
      { _id: blogId },
      { isDeleted: true }
    );
    if (!blog) {
      throw new Error(
        "blog not found or User not authorized",
        "Delete blog Error"
      );
    }

    res.status(200).json({
      success: true,
      data: null,
      message: "blog delete success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
module.exports = blogController;
