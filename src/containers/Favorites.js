import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Favorites.css";

const Favorites = () => {
  // récupération des cookies
  const tmpFavoriteComics = Cookies.get("favoriteComics");
  const tmpFavoriteCharacters = Cookies.get("favoriteCharacters");
  // suppression des [ ] dans le string récupéré
  const strFavoriteComics = tmpFavoriteComics.substring(
    1,
    tmpFavoriteComics.length - 1
  );
  const strFavoriteCharacters = tmpFavoriteCharacters.substring(
    1,
    tmpFavoriteCharacters.length - 1
  );
  // check
  console.log("strFavoriteComics from Cookies", strFavoriteComics);
  console.log("strFavoriteCharacters from Cookies", strFavoriteCharacters);

  // recréation de la liste des favoris
  const listFavComics = strFavoriteComics.split("%2C");
  const listFavCharacters = strFavoriteCharacters.split("2%C");
  // check
  console.log("listFavComics", listFavComics);
  console.log("listFavCharacters", listFavCharacters);

  return (
    <div className="favorites">
      <div className="container">
        <div className="favChar">
          <h2>Personnages favoris : </h2>
        </div>
        <div className="favCom">
          <h2>Comics favoris :</h2>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
