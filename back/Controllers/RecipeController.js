const Recipe = require('../Models/RecipeModel');

const createRecipe = async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body);
        res.status(201).json(newRecipe);
    } catch (err) {
        console.error('erreur lors de l\'ajout : ', err.message);
    }
}

module.exports = {
    createRecipe
};