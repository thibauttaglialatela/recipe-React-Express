const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    ingredients: {type:[String], required:true},
    instructions: { type:String, required:true},
    image: {type: String},
    category: {type: String, required: true}
    
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;