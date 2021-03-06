const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, default: 1 },
      },
    ],

    cartPackage: {
      packageId: {
        type: Schema.Types.ObjectId,
        ref: "Packages",
      },
      cylceId: { type: Schema.Types.ObjectId, ref: "Cycle" },
      deliveryTime: {
        type: String,
        enum: ["8am", "10am", "1pm"],
      },
      dateStart: {
        type: String,
      },
    },

    balance: { type: String, default: 0 },
    avatarUrl: {
      type: String,
      default:
        "https://api-private.atlassian.com/users/850ae4c9bf8ca767eb65b41f527f5e3b/avatar",
    },
    billingDetails: {
      fullname: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
      address1: {
        type: String,
        default: "",
      },
      address2: { type: String },
      phone: {
        type: Number,
        default: "",
      },
      city: {
        type: String,

        default: "",
      },
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;

  delete obj.isDeleted;
  return obj;
};

userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
  const userObj = new this();
  this.findOne({ email: profile.email }, async function (err, result) {
    if (!result) {
      /// create user.
      //1. make new password
      const newPassword = "" + Math.floor(Math.random() * 100000000);
      const salt = await brcypt.genSalt(10);
      newPassword = await brcypt.hash(newPassword, salt);
      //2.save user//
      userObj.name = profile.name;
      userObj.email = profile.email;
      userObj.password = newPassword;
      userObj.avatarUrl = profile.avatarUrl;
      //3. call the cb (call back)
      await userObj.save(cb);
    } else {
      /// send the user info to passport
      cb(err, result); /// send the result to callback function in passport helper
    }
  });
};

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return accessToken;
};
userSchema.plugin(require("./plugins/isDeletedFalse"));

const User = mongoose.model("User", userSchema);
module.exports = User;
