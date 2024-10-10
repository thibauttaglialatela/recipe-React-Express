const express = require("express");
const { createRecipe } = require("../Controllers/RecipeController");
const router = express.Router();

router.post('/api/recipe/', createRecipe);

module.exports = router;