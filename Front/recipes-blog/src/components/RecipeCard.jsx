import React from "react";
import {Link} from "react-router-dom";

const RecipeCard = ({ title, description, image, _id}) => {
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
            <body className="card-content">
                <h2>{title}</h2>
                <p>{description}</p>
            </body>
            <Link to="#">
            <button className="details-button">Détails</button>
            </Link>
        </article>
    );
}

export default RecipeCard;