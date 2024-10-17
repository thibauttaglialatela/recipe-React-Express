import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateRecipe = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        category:""
    });

    const [image, setImage] = useState(null);

    const fetchRecipe = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
            const data = await response.json();
            setRecipe(data);
        } catch (error) {
            console.error("Erreur lors la récupération de la recette:", error.message);
        }
    };

    useEffect(() => {
        fetchRecipe();
    }, [id]); 

    const handleChange = (e) => {
        setRecipe({...recipe, [e.target.name]: e.target.value})
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", recipe.title);
        formData.append("description", recipe.description);
        formData.append("ingredients", recipe.ingredients);
        formData.append("instructions", recipe.instructions);
        formData.append("category", recipe.category);
        if (recipe.image) {
            formData.append("image", recipe.image);
        }

        try {
            const response = await fetch(`http://localhost:3000/api/recipes/${id}`, {
                method: "PUT",
                body: formData
            });

            if (!response.ok) {
                console.error("Erreur lors la mise à jour de la recette");
            } else {
                navigate(`/show-recipe/${id}`);
            }

        } catch (error) {
            console.error("Erreur dans la soumission du formulaire", error.message)
            
        }
    }
    return (
        <>
      <h1>Mise à jour de la recette</h1>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <label htmlFor="title">
          Titre de la recette
          <input
            type="text"
            name="title"
            id="title"
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            value={recipe.description}
            onChange={handleChange}
            required
            cols="30"
            rows="5"
          />
        </label>

        <label htmlFor="ingredients">
          Liste des ingrédients
          <input
            type="text"
            name="ingredients"
            id="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="instructions">
          Instructions de la recette
          <textarea
            name="instructions"
            id="instructions"
            cols="30"
            rows="10"
            value={recipe.instructions}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label htmlFor="image">
          Ajouter une image :
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
          />
        </label>

        <label htmlFor="category">
          <select
            name="category"
            id="category"
            value={recipe.category}
            onChange={handleChange}
            required
          >
            <option value="">--Catégorie--</option>
            <option value="Entrée">Entrée</option>
            <option value="Plat">Plat</option>
            <option value="Dessert">Dessert</option>
          </select>
        </label>

        <button type="submit">Mettre à jour</button>
      </form>
    </>
    )
}

export default UpdateRecipe;