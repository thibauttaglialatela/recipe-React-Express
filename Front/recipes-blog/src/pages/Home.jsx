import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrlApi = "http://localhost:3000/api/recipes/";

  useEffect(() => {
    getRecipes();
  }, []);

  const handleDelete = async (id) => {
    console.log('deleting recipe with id: ', id);
    setIsLoading(true);
    try {
      const response = await fetch(baseUrlApi + id, {
        method: "DELETE",
      });
  
      console.log("Response status:", response.status); // Log response status
      
      if (!response.ok) {
        const errorText = await response.text(); // Get more error details if available
        console.error("Failed to delete recipe. Error details:", errorText);
        throw new Error("Failed to delete recipe");
      }
  
      const updatedRecipes = [ ...recipes.filter((recipe) => recipe._id !== id)];
      setRecipes(updatedRecipes);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  const getRecipes = async () => {
    const response = await fetch("http://localhost:3000/api/recipes/list");
    const data = await response.json();
    setRecipes(data);
  };



  
  return (
    <>
      <h1>Site de recette de cuisine</h1>
      <section className="grid-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
        {
        recipes.length <= 0 ? (
          <p>Pas de recettes actuellement</p>
        ) : 
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            title={recipe.title}
            description={recipe.description}
            image={recipe.image}
            _id={recipe._id}
            handleDelete={handleDelete}
          />
        ))}
      </section>
    </>
  );
};

export default Home;
