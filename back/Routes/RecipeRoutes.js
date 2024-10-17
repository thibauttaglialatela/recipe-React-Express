const express = require("express");
const { createRecipe, getAllRecipes, getOneRecipeById, deleteOneRecipeById, findAndUpdateOneRecipe } = require("../Controllers/RecipeController");
const router = express.Router();
const upload = require('../Middlewares/Multer');


router.post('/api/recipes/', upload.single('image'), createRecipe);
router.get('/api/recipes/list', getAllRecipes);
router.get('/api/recipes/:id', getOneRecipeById);
router.delete('/api/recipes/:id', deleteOneRecipeById);
router.put('/api/recipes/:id', upload.single('image'), findAndUpdateOneRecipe);

module.exports = router;