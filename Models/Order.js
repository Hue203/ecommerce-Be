const mogoose = require("mongoose");
const Schema = mogoose.Schema;
const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productList: [
      {
        product: {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          productId: { type: Schema.Types.ObjectId }, /// for sort, filter data (bussiness managements)
        },
        quantity: {
          type: Number,
          default: 0,
          required: true,
        },
      },
    ],

    billingDetails: {
      fullname: {
        type: String,
        required: true,
      },
      address1: {
        type: String,
        required: true,
      },
      address2: { type: String },
      phone: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      region: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
      country: {
        type: String,
        default: "VietNam",
      },
    },
    statusOrder: {
      type: String,
      enum: ["pending", "delivery", "cancel", "paid"],
      default: "pending",
      required: true,
    },
    paymentMethod: {
      type: String,
      emum: ["paypal", "COD"],
      required: true,
      default: "COD",
    },
    shipmentStatus: {
      type: String,
      enum: ["processing", "delivered", "return"],
      required: true,
      default: "processing",
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    discount: {
      type: Number,
    },
    totalProduct: { type: Number, default: 0, required: true },
    paid: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Order = mogoose.model("Order", orderSchema);
module.exports = Order;
