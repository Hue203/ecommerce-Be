const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cycleSchema = new Schema(
  {
    cycleName: { type: String, required: true },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Cycle = mongoose.model("Cycle", cycleSchema);
module.exports = Cycle;
