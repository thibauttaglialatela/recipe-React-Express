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

const getOneRecipeById = async (req, res) => {
    const {id} = req.params;
    try {
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            res.status(404).json({message: 'Recette inconnue'});
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({erreur: err.message});
    }

}

module.exports = {
    createRecipe,
    getAllRecipes,
    getOneRecipeById
};