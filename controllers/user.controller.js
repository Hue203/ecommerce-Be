const User = require("../Models/User");
const userController = {};
const bcrypt = require("bcryptjs");

userController.register = async (req, res, next) => {
  try {
    let { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("Email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await User.create({ name, email, password, role });

    res.status(200).json({
      success: true,
      data: user,
      message: `user ${user.name} created`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
userController.updateProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const allows = ["name", "password", "avatarUrl"];
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Acount not found", "Update proflie Error");
    }
    allows.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });
    await user.save();
    res.status(200).json({
      success: true,
      data: user,
      message: `update profile successful`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

userController.getUsers = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalUsers = await User.count({
      ...filter,
      isDeleted: false,
    });
    const totalPages = Math.ceil(totalUsers / limit);
    const offset = limit * (page - 1);

    let users = await User.find(filter)
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);
    res.status(200).json({
      success: true,
      data: user,
      message: `Get users Success`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

userController.getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    console.log("userId", userId);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found", "Get Current User Error");
    }
    res.status(200).json({
      success: true,
      data: user,
      message: `Get current user successful`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
userController.getAllUser = async (req, res, next) => {
  try {
  } catch (err) {}
};
userController.getCurrentUserOrder = async (req, res, next) => {
  try {
    //pagination
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalUsers = await User.countDocuments({
      ...filter,
      isDeleted: false,
    });
    const totalPages = Math.ceil(totalUsers / limit);
    const offset = limit * (page - 1);
    //current user
    const currentUserId = req.userId;
    const currentUser = await User.findById(currentUserId);
    //target user
    const userId = req.params.id;
    //current usser request other order
    if (userId !== currentUserId && currentUser.role !== "admin") {
      throw new Error("Only admin can check orther user Order detail");
    }
    //current user request its order or admin request user's order
    const order = await Order.find({ userId })
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);

    //in case no order
    if (!order) return next(new Error(`401 - ${userId} has no order`));
    res.status(200).json({
      success: true,
      data: { order, totalPages },
      message: `Get order from userId: ${userId} success`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
userController.paymentUserOder = async (req, res, next) => {
  try {
    //get request detail.
    const orderId = req.params.id;
    const currentUserId = req.userId;
    /// find order to pay, get balance

    let order = await Order.findById(orderId);
    let currentUser = await User.findById(currentUserId);
    const total = order.total;
    const funds = currentUser.balance;
    //check funds
    if (total > funds) return next(new Error("403 - Insufficient balance"));

    // update new balance
    user = await User.findOneAndUpdate(
      { _id: currentUserId },
      { balance: funds - total },
      { new: true }
    );
    //update order
    order = await Order.findOneAndUpdate(
      { _id: orderId },
      { status: "paid" },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: { user, order },
      message: "Gell all product success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
module.exports = userController;