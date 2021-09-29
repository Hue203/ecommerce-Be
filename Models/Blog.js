const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    blogImage: {
      type: String,
      default:
        "https://api-private.atlassian.com/information/850ae4c9bf8ca767eb65b41f527f5e3b/avatar",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
