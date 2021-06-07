const packageController = {};
const Package = require("../Models/Package");
const mongoose = require("mongoose");

//Get all packages
packageController.getAllPackages = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalPackages = await Package.count({
      ...filter,
      isDeleted: false,
    });
    const totalPages = Math.ceil(totalPackages / limit);
    const offset = limit * (page - 1);
    const packages = await Package.find(filter)
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate({
        path: "products",
        populate: { path: "productId" },
      });

    res.status(200).json({
      success: true,
      data: { packages, totalPages },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

///Create package.

packageController.createpackage = async (req, res, next) => {
  try {
    let { name, product1, product2, images } = req.body;
    console.log("hahahha", name, product1, product2, images);
    /*  let p1 = await Product.findById(product1);
    let p2 = await Product.findById(product2); */
    let products = [{ productId: product1 }, { productId: product2 }];
    console.log(typeof products[0].producId);
    let package = await Package.create({
      name,
      products: products,
      images,
    });
    package
      .populate({
        path: "products",
        populate: { path: "productId" },
      })
      .execPopulate();
    res.status(200).json({
      success: true,
      data: package,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

///Get single package
packageController.getSinglepackage = async (req, res, next) => {
  try {
    let package = await Package.findById(req.params.id).populate(
      "productId",
      "-_id -__v"
    );
    if (!package) {
      throw new Error("package not found", "Get Single package Error");
    }

    package = package.toJSON();

    res.status(200).json({
      success: true,
      data: package,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

///Updatepackage.
packageController.updatepackage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const packageId = req.params.id;
    const { name, products, packageType, cycle, price, images } = req.body;
    const package = await Package.findOneAndUpdate(
      { _id: packageId },
      {
        name,
        products,
        packageType,
        cycle,
        price,
        images,
      },

      { new: true }
    );
    if (!package) {
      throw new Error(
        "package not found or User not authorized",
        "Updated package Error"
      );
    }

    res.status(200).json({
      success: true,
      data: package,
      message: "package updated success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
///Detelete package

packageController.deletepackage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const packageId = req.params.id;

    const package = await Package.findOneAndDelete(
      { _id: packageId },
      { isDeleted: true }
    );
    if (!package) {
      throw new Error(
        "package not found or User not authorized",
        "Delete package Error"
      );
    }

    res.status(200).json({
      success: true,
      data: null,
      message: "package delete success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = packageController;
