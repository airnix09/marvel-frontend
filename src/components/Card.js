import React from "react";
import Cookies from "js-cookie";
import "./Card.css";

const Card = ({
  id,
  title,
  description,
  picture,
  setFavoriteCharacters,
  favoriteCharacters,
  setFavoriteComics,
  favoriteComics
}) => {
  return (
    <div className="card">
      <div className="card-illustration">
        <img src={picture} alt={title} />
        <button
          onClick={() => {
            if (setFavoriteCharacters && favoriteCharacters) {
              const copy = [...favoriteCharacters];
              copy.push(id);
              setFavoriteCharacters(copy);
            } else if (setFavoriteComics && favoriteComics) {
              const copy = [...favoriteComics];
              copy.push(id);
              setFavoriteComics(copy);
            }
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
