const express = require("express");
const { createRecipe, getAllRecipes, getOneRecipeById, deleteOneRecipeById, findAndUpdateOneRecipe } = require("../Controllers/RecipeController");
const router = express.Router();
const upload = require('../Middlewares/Multer');


router.post('/', upload.single('image'), createRecipe);
router.get('/list', getAllRecipes);
router.get('/:id', getOneRecipeById);
router.delete('/:id', deleteOneRecipeById);
router.put('/:id', upload.single('image'), findAndUpdateOneRecipe);

module.exports = router;