const Recipe = require('../Models/RecipeModel');

const createRecipe = async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body);
        res.status(201).json(newRecipe);
    } catch (err) {
        console.error('erreur lors de l\'ajout : ', err.message);
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (err) {
        console.error('Erreur lors de la récupération : ', err.message);
    }
}

module.exports = {
    createRecipe,
    getAllRecipes
};