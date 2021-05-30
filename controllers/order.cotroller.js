const orderController = {};
const Order = require("../Models/Order");
const User = require("../Models/User");

orderController.createOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { totalAmount } = req.body;
    let user = await User.findById(userId).populate({
      path: "cart",
      populate: { path: "productId" },
    });
    console.log("user", user);
    const producList = user.cart;
    console.log("producList", producList);
    let order = await Order.create({
      userId: userId,
      productList: producList,
      totalPrice: totalAmount,
    });
    order.populate("productId").execPopulate();
    user = await User.findByIdAndUpdate(userId, {
      cart: [],
    });
    console.log("new", user);
    res.status(200).json({
      success: true,
      data: order,
      message: "Order create Scuccess",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

//Get all order with pagination
orderController.getAllOrders = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalOrders = await Order.count({ ...filter, isDeleted: false });
    const totalPages = Math.ceil(totalOrders / limit);
    const offset = limit * (page - 1);
    const orders = await Order.find(filter)
      .find(filter)
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: { orders, totalPages },
      message: "Gell all order success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

///Get single order
orderController.getSingleOrder = async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      throw new Error("order not found", "Get Single order Error");
    }

    order = order.toJSON();

    res.status(200).json({
      success: true,
      data: order,
      message: "Gell single order success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

///Updateorder.
orderController.updateOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const orderId = req.params.id;
    const {
      productList,
      statusOrder,
      shippingFee,
      totalPrice,
      discount,
      totalProduct,
    } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        productList,

        statusOrder,

        shippingFee,
        totalPrice,
        discount,
        totalProduct,
      },

      { new: true }
    );
    if (!order) {
      throw new Error(
        "order not found or User not authorized",
        "Updated order Error"
      );
    }

    res.status(200).json({
      success: true,
      data: order,
      message: "order updated success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
///Detelete order

orderController.deleteOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(
      orderId,

      { isDeleted: true }
    );
    if (!order) {
      throw new Error(
        "order not found or User not authorized",
        "Delete order Error"
      );
    }

    res.status(200).json({
      success: true,
      data: null,
      message: "order delete success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
orderController.getCurrentUserOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("user not found");
    }
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalOrders = await Order.count({ ...filter, isDeleted: false });
    const totalPages = Math.ceil(totalOrders / limit);
    const offset = limit * (page - 1);
    const orders = await Order.find(filter)
      .find(filter)
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: { orders, totalPages },
      message: "Gell all order success",
    });

    res.status(200).json({
      success: true,
      data: null,
      message: "order delete success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
module.exports = orderController;
