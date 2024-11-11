import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
    image: null,
    category: ""
  });
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const formData = new FormData();
  formData.append("title", recipe.title);
  formData.append("description", recipe.description);
  formData.append("ingredients", recipe.ingredients);
  formData.append("instructions", recipe.instructions);
  formData.append("image", image);
  formData.append("category", recipe.category);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/recipes/", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      alert("Erreur lors de l'ajout de la recette");
    } else {
      alert("recette ajoutée");
      navigate("/");
    }
  };
  return (
    <>
      <h1>Add a recipe</h1>
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

        <button type="submit">Ajouter la recette</button>
      </form>
    </>
  );
};

export default CreateRecipe;
