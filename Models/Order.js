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
        productId: {
          name: { type: String, required: true },
          catagories: {
            type: String,
            required: true,
            enum: ["fresh", "dried", "cereal"],
          },
          service: {
            type: String,
            required: true,
            enum: ["fixed-drink", "make-your-own"],
            default: "fixed-drink",
          },

          price: { type: Number, required: true },

          images: [{ imageUrl: { type: String } }],
        },

        quantity: {
          type: Number,
          default: 0,
          required: true,
        },
      },
    ],
    statusOrder: {
      type: String,
      enum: ["pending", "cancel", "delivery", "paid"],
      default: "pending",
      required: true,
    },
    paymentMethod: {
      type: String,

      required: true,
      default: "COD",
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
      default: 0,
    },
    totalProduct: { type: Number, default: 0, required: true },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Order = mogoose.model("Order", orderSchema);
module.exports = Order;
