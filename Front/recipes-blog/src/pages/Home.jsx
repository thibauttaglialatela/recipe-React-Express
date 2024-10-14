import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const response = await fetch("http://localhost:3000/api/recipes/list");
    const data = await response.json();
    setRecipes(data);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  console.log(recipes);
  return (
    <>
      <h1>Site de recette de cuisine</h1>
      <section className="grid-container">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            title={recipe.title}
            description={recipe.description}
            image={recipe.image}
            _id={recipe._id}
          />
        ))}
      </section>
    </>
  );
};

export default Home;
