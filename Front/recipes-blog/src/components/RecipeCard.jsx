import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const RecipeCard = ({ title, description, image, _id, handleDelete}) => {
    
    return (
        <article className="card">
            <header className="card-image">
                {
                    image ? (
                        <img src={`http://localhost:3000/uploads/${image}`} alt={title} />
                    ) : (
                        <img src="https://picsum.photos/id/163/300" alt="table restaurant" />
                    )
                }
            </header>
            <div className="card-content">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <footer>
            <Link to={`/show-recipe/${_id}`}>
            <button className="details-button">Détails</button>
            </Link>
            <button onClick={() => handleDelete(_id)} className="delete-button">Supprimer la recette</button>
            <Link to={`/update-recipe/${_id}`}>
            <button className="details-button">Mettre à jour</button>
            </Link>
            </footer>
        </article>
    );
}

export default RecipeCard;