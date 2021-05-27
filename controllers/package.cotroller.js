const packageController = {};
const Package = require("../Models/Package");

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
      .populate("productId");

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
    let { name, products, packageType, cycle, totalPrice, images } = req.body;
    let package = await Package.findOne({ name: name });
    if (package) {
      throw new Error("package already exists");
    }
    let newpackage = await Package.create({
      name,
      products,
      packageType,
      cycle,
      totalPrice,
      images,
    });
    res.status(200).json({
      success: true,
      data: newpackage,
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
    const { name, products, packageType, cycle, totalPrice, images } = req.body;
    const package = await Package.findOneAndUpdate(
      { _id: packageId },
      {
        name,
        products,
        packageType,
        cycle,
        totalPrice,
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
