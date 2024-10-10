import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
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
      <h1>Ajout d'une recette</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nom de la recette
          <input
            type="text"
            name="name"
            id="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="instructions">
          Instructions
          <textarea
            name="instructions"
            id="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
            cols="30"
            rows="10"
          />
        </label>

        <label htmlFor="preparationTime">
          Temps de préparation (en minutes)
          <input
            type="number"
            name="preparationTime"
            id="preparationTime"
            value={recipe.preparationTime}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="difficulty">
          <select
            name="difficulty"
            id="difficulty"
            value={recipe.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">--Difficulté de la recette--</option>
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyenne</option>
            <option value="Difficile">Difficile</option>
          </select>
        </label>

        <button type="submit">Ajouter la recette</button>
      </form>
    </>
  );
};

export default CreateRecipe;
