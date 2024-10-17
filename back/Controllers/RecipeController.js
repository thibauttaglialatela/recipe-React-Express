const Recipe = require('../Models/RecipeModel');


const createRecipe = async (req, res) => {

    try {
        const recipeData = {
            ...req.body,
            image: req.file ? req.file.filename : null
        };

        const newRecipe = await Recipe.create(recipeData);

        res.status(201).json(newRecipe);
    } catch (err) {
        console.error('erreur lors de l\'ajout : ', err.message);
        res.status(500).json({message: 'Erreur lors de l\'ajout de la recette'});
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (err) {
        console.error('Erreur lors de la récupération : ', err.message);
        res.status(500).json({message: 'Erreur lors de la récupération des recettes'});
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

const deleteOneRecipeById = async (req, res) => {
    const {id} = req.params;
    try {
        const response = await Recipe.deleteOne({_id: id});

        if (response.deletedCount !== 1) {
            return res.status(404).json({message: `Recette non trouvée avec l'id: ${id}`});
        }
        
        return res.status(200).json({message: 'Recette supprimée avec succès'});
        
    } catch (err) {
        res.status(500).json({message: `Erreur lors de la suppression : ${err.message}`});
    }
}

const findAndUpdateOneRecipe = async (req, res) => {
    const {id} = req.params;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({message: 'Données de mise à jour manquantes'});
    }
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if (!updatedRecipe) {
            return res.status(404).json({message: `Recette avec id ${id} introuvable`});
        }
        res.json({message: 'Recette mise à jour', data: updatedRecipe});
        
    } catch (error) {
        res.status(500).json({message: `Erreur dans le traitement de la requête: ${error.message}`});
    }

}


module.exports = {
    createRecipe,
    getAllRecipes,
    getOneRecipeById,
    deleteOneRecipeById,
    findAndUpdateOneRecipe
};