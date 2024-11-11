const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, maxLength: 250 },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String },
  category: {
    type: String,
    enum: ["Entrée", "Plat", "Dessert"],
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
