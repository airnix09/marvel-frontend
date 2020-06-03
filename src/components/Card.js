import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({
  id,
  title,
  description,
  picture,
  context,
  favoriteComics,
  setFavoriteComics,
  favoriteCharacters,
  setFavoriteCharacters,
}) => {
  return (
    <div className="card">
      <div className="card-illustration">
        {context === "characters" ? (
          <Link to={"/character/" + id} key={id}>
            <img src={picture} alt={title} />
          </Link>
        ) : (
          <img src={picture} alt={title} />
        )}
        <button
          onClick={() => {
            if (
              // setFavoriteCharacters &&
              // favoriteCharacters &&
              (context = "characters" && favoriteCharacters.indexOf(id) === -1)
            ) {
              const copy = [...favoriteCharacters];
              copy.push(id);
              setFavoriteCharacters(copy);
            } else if (
              // setFavoriteComics &&
              // favoriteComics &&
              (context = "comics" && favoriteComics.indexOf(id) === -1)
            ) {
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
