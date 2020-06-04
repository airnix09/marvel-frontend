import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Cookies from "js-cookie";
import "./Favorites.css";

const Favorites = (
  favoriteComics,
  setFavoriteComics,
  favoriteCharacters,
  setFavoriteCharacters
) => {
  // get cookies
  const tmpFavoriteComics = Cookies.get("favoriteComics");
  const tmpFavoriteCharacters = Cookies.get("favoriteCharacters");

  // recreate the favorites list
  const strFavoriteComics = tmpFavoriteComics.substring(
    1,
    tmpFavoriteComics.length - 1
  );
  const strFavoriteCharacters = tmpFavoriteCharacters.substring(
    1,
    tmpFavoriteCharacters.length - 1
  );

  const listFavComics = strFavoriteComics.split(",").filter((elem) => {
    return elem !== "";
  });
  const listFavCharacters = strFavoriteCharacters.split(",").filter((elem) => {
    return elem !== "";
  });

  // declare state
  const [dataChar, setDataChar] = useState([]);
  const [dataCom, setDataCom] = useState([]);
  const urlChar = "https://marvel-project-backend.herokuapp.com/characters/";
  const urlCom = "https://marvel-project-backend.herokuapp.com/comics/";
  const [isCharLoaded, setIsCharLoaded] = useState(false);
  const [isComLoaded, setIsComLoaded] = useState(false);

  const fetchCharData = async () => {
    try {
      // for every characters in favorite list
      if (listFavCharacters.length > 0) {
        const tmpDataChar = [];
        for (let index = 0; index < listFavCharacters.length; index++) {
          const char = listFavCharacters[index];
          const response = await axios.get(urlChar + char);
          tmpDataChar.push(response.data.results[0]);
        }
        setDataChar(tmpDataChar);
      }
      setIsCharLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchComData = async () => {
    try {
      // for every comics in favorite list
      if (listFavComics.length > 0) {
        const tmpDataCom = [];
        for (let index = 0; index < listFavComics.length; index++) {
          const com = listFavComics[index];
          const response = await axios.get(urlCom + com);
          tmpDataCom.push(response.data.results[0]);
        }
        setDataCom(tmpDataCom);
      }
      setIsComLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCharData();
    fetchComData();
  }, []);

  return (
    <div className="favorites">
      <div className="container">
        <div className="favChar">
          <h2>Personnages favoris : </h2>
          <div className="result">
            {isCharLoaded && dataChar.length > 0 ? (
              dataChar.map((elem, index) => {
                return (
                  <Card
                    id={elem.id}
                    key={elem.id}
                    title={elem.name}
                    picture={
                      elem.thumbnail.path + "." + elem.thumbnail.extension
                    }
                    description={elem.description}
                    setFavoriteCharacters={setFavoriteCharacters}
                    favoriteCharacters={favoriteCharacters}
                    context="characters"
                  />
                );
              })
            ) : isCharLoaded && dataChar.length === 0 ? (
              <div className="charging">Pas de personnage favori</div>
            ) : (
              <div className="charging">Chargement en cours</div>
            )}
          </div>
        </div>
        <div className="favCom">
          <h2>Comics favoris :</h2>
          <div className="result">
            {isComLoaded && dataCom.length > 0 ? (
              dataCom.map((elem, index) => {
                return (
                  <Card
                    id={elem.id}
                    key={elem.id}
                    title={elem.title}
                    picture={
                      elem.thumbnail.path + "." + elem.thumbnail.extension
                    }
                    description={elem.description}
                    setFavoriteComics={setFavoriteComics}
                    favoriteComics={favoriteComics}
                    context="comics"
                  />
                );
              })
            ) : isComLoaded && dataCom.length === 0 ? (
              <div className="charging">Pas de comics favori</div>
            ) : (
              <div className="charging">Chargement en cours</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
