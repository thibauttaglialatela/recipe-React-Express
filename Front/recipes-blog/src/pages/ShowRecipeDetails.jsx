import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ShowRecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
      if (!response.ok) {
        throw new Error("echec dans la récupération");
      }
      const data = await response.json();
      setRecipe(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  console.log(recipe);

  if (loading) {
    return <p>En chargement...</p>;
  }

  if (error) {
    return <p>Erreurs : {error}</p>;
  }

  return (
<article className="recipe-flex-container">
  <header>
    <h1>{recipe.title}</h1>
  </header>
  
  <figure>
    {recipe.image ? (
      <img
        src={`http://localhost:3000/uploads/${recipe.image}`}
        alt={recipe.title}
      />
    ) : (
      <img src="https://picsum.photos/id/163/300" alt="table restaurant" />
    )}
    <figcaption>{recipe.title}</figcaption>
  </figure>
  
  <section aria-labelledby="ingredients-title">
    <h2 id="ingredients-title">Liste des ingrédients</h2>
    <ul>
      {recipe.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ))}
    </ul>
  </section>

  <section aria-labelledby="instructions-title">
    <h2 id="instructions-title">Instructions</h2>
    <p>{recipe.instructions}</p>
  </section>

  <footer>
    <h3>Catégorie : {recipe.category}</h3>
  </footer>
</article>

  );
};

export default ShowRecipeDetails;
