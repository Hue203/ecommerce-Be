const orderController = {};
const Order = require("../Models/Order");

orderController.createOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const {
      productList,
      billingDetails,
      statusOrder,
      paymentMethod,
      shipmentStatus,
      shippingFee,
      totalPrice,
      discount,
      totalProduct,
      paid,
    } = req.body;
    let order = await Order.create({
      userId: userId,
      productList,
      billingDetails,
      statusOrder,
      paymentMethod,
      shipmentStatus,
      shippingFee,
      totalPrice,
      discount,
      totalProduct,
      paid,
    });
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

//Get all order with pagination
orderController.getAllorders = async (req, res, next) => {
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
orderController.getSingleorder = async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      throw new Error("order not found", "Get Single order Error");
    }

    order = order.toJSON();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

///Updateorder.
orderController.updateorder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const orderId = req.params.id;
    const {
      productList,
      billingDetails,
      statusOrder,
      paymentMethod,
      shipmentStatus,
      shippingFee,
      totalPrice,
      discount,
      totalProduct,
      paid,
    } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        productList,
        billingDetails,
        statusOrder,
        paymentMethod,
        shipmentStatus,
        shippingFee,
        totalPrice,
        discount,
        totalProduct,
        paid,
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

orderController.deleteorder = async (req, res, next) => {
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
module.exports = orderController;
