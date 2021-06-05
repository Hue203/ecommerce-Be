const productController = {};
const Product = require("../Models/Product");
const Review = require("../Models/Review");
//Get all product with pagination
productController.getAllProducts = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    console.log("filter", filter);
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalProducts = await Product.count({ ...filter, isDeleted: false });
    const totalPages = Math.ceil(totalProducts / limit);
    const offset = limit * (page - 1);
    const products = await Product.find(filter)
      .find(filter)
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: { products, totalPages },
      message: "Gell all product success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

///Create product.

productController.createProduct = async (req, res, next) => {
  try {
    let {
      name,
      catagories,
      ingredients,
      description,
      price,
      quantity,
      images,
      service,
    } = req.body;

    let newProduct = await Product.create({
      name,
      catagories,
      ingredients,
      description,
      price,
      quantity,
      images,
      service,
    });
    res.status(200).json({
      success: true,
      data: newProduct,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

///Get single product
productController.getSingleProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error("Product not found", "Get Single product Error");
    }

    product = product.toJSON();
    product.reviews = await Review.find({ productId: product._id });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

///UpdateProduct.
productController.updateProduct = async (req, res, next) => {
  try {
    const userId = req.userId;
    const productId = req.params.id;
    const {
      name,
      catagories,
      ingredients,
      description,
      price,
      quantity,
      images,
      service,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        catagories,
        ingredients,
        description,
        price,
        quantity,
        images,
        service,
      },

      { new: true }
    );
    if (!product) {
      throw new Error(
        "Product not found or User not authorized",
        "Updated product Error"
      );
    }

    res.status(200).json({
      success: true,
      data: product,
      message: "Product updated success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
///Detelete product

productController.deleteProduct = async (req, res, next) => {
  try {
    const userId = req.userId;
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId, {
      isDeleted: true,
    });

    if (!product) {
      throw new Error(
        "Product not found or User not authorized",
        "Delete product Error"
      );
    }

    res.status(200).json({
      success: true,
      data: null,
      message: "Product delete success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = productController;
