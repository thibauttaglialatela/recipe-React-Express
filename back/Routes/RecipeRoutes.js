const express = require("express");
const { createRecipe, getAllRecipes } = require("../Controllers/RecipeController");
const router = express.Router();

router.post('/api/recipes/', createRecipe);
router.get('/api/recipes/list', getAllRecipes);

module.exports = router;