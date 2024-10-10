const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
    name: { type: String, required: true},
    instructions: { type: String, required: true},
    preparationTime: { type: Number, required: true},
    difficulty: {type: String, enum: ['Facile', 'Moyen', 'Difficile'], default: 'Moyen'},
    Illustration: {type: String}
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;