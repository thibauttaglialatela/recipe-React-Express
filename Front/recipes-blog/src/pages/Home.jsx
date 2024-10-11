import React, {useState, useEffect} from 'react';

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
        </>
    );
}

export default Home;