const express = require("express");
const { createRecipe, getAllRecipes, getOneRecipeById } = require("../Controllers/RecipeController");
const router = express.Router();

router.post('/api/recipes/', createRecipe);
router.get('/api/recipes/list', getAllRecipes);
router.get('/api/recipes/:id', getOneRecipeById);

module.exports = router;