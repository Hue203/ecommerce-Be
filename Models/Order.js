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
          name: { type: String },
          catagories: {
            type: String,

            enum: ["fresh", "dried", "cereal"],
          },
          service: {
            type: String,

            enum: ["fixed-drink", "make-your-own"],
            default: "fixed-drink",
          },

          price: { type: Number },

          images: [{ imageUrl: { type: String } }],
        },

        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],

    package: {
      packageId: {
        name: { type: String },
        products: [
          { productId: { type: Schema.Types.ObjectId, ref: "Product" } },
        ],
        images: [{ imageUrl: { type: String } }],
        packageType: {
          type: String,

          default: "2 drink/day",
        },
      },
      cycleId: {
        cycleName: { type: String },
        price: {
          type: Number,
        },
      },
      deliveryTime: {
        type: String,

        enum: ["8am", "10am", "1pm"],
      },
      dateStart: {
        type: String,
      },
    },
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
