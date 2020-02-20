import React from "react";
import Cookies from "js-cookie";
import "./Card.css";

const Card = ({ id, title, description, picture, setFavorite, favorite }) => {
  return (
    <div className="card">
      <div className="card-illustration">
        <img src={picture} alt={title} />
        <button
          onClick={() => {
            const copy = [...favorite];
            copy.push(id);
            setFavorite(copy);
          }}
        >
          Ajouter au favoris
        </button>
      </div>
      <div className="card-infos">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
