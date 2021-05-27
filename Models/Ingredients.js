const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const ingredientsSchema = new Schema(
  {
    material: { type: String, required: true }, //Optional orange, water,ginger,honey, apple, ice///
    quantity: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Ingredients = moongoose.model("Ingredients", ingredientsSchema);

module.exports = Ingredients;
