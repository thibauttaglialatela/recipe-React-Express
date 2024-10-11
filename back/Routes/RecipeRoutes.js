const express = require("express");
const { createRecipe, getAllRecipes, getOneRecipeById } = require("../Controllers/RecipeController");
const router = express.Router();
const upload = require('../Middlewares/Multer');


router.post('/api/recipes/', upload.single('image'), createRecipe);
router.get('/api/recipes/list', getAllRecipes);
router.get('/api/recipes/:id', getOneRecipeById);

module.exports = router;