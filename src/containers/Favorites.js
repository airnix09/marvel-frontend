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
  const listFavComics = strFavoriteComics.split(",").filter((elem) => {
    return elem !== "";
  });
  const listFavCharacters = strFavoriteCharacters.split(",").filter((elem) => {
    return elem !== "";
  });
  // check
  console.log("listFavComics", listFavComics);
  console.log("listFavCharacters", listFavCharacters);

  // déclaration des states
  const [dataChar, setDataChar] = useState([]);
  const [dataCom, setDataCom] = useState([]);
  const urlChar = "https://marvel-project-backend.herokuapp.com/characters/";
  const urlCom = "https://marvel-project-backend.herokuapp.com/comics/";
  const [isCharLoaded, setIsCharLoaded] = useState(false);
  const [isComLoaded, setIsComLoaded] = useState(false);

  // déclaration de la fonction qui recherche les données des personnages favoris
  const fetchCharData = async () => {
    try {
      // pour chaque personnage dans les favoris
      if (listFavCharacters.length > 0) {
        const tmpDataChar = [];
        for (let index = 0; index < listFavCharacters.length; index++) {
          const char = listFavCharacters[index];
          // récupération des données sur le backend
          console.log("url for Characters to fetch : ", urlChar + char);
          const response = await axios.get(urlChar + char);
          console.log(
            "retour du backend pour characters",
            response.data.results
          );
          // on stock la réponse dans un état tableau temp
          // si dans l'état il rafraichit la page et écrase celui déjà là.
          tmpDataChar.push(response.data.results[0]); // results est déjà un tableau, il faut envoyer son contenu
        }
        // on met à jour l'état avec le tableau temp finalisé
        setDataChar(tmpDataChar);
      }
      // on dit que la page est chargée
      setIsCharLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  // déclaration de la fonction qui recherche les données des comics favoris
  const fetchComData = async () => {
    try {
      // pour chaque personnage dans les favoris
      if (listFavComics.length > 0) {
        const tmpDataCom = [];
        for (let index = 0; index < listFavComics.length; index++) {
          const com = listFavComics[index];
          // récupération des données sur le backend
          console.log("url for comics to fetch : ", urlCom + com);
          const response = await axios.get(urlCom + com);
          console.log("retour du backend pour comics", response.data.results);
          // on stock la réponse dans un état tableau temp
          // si dans l'état il rafraichit la page et écrase celui déjà là.
          tmpDataCom.push(response.data.results[0]); // results est déjà un tableau, il faut envoyer son contenu
        }

        // on met à jour l'état avec le tableau temp finalisé
        setDataCom(tmpDataCom);
      }
      // on dit que la page est chargée
      setIsComLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  // lancement à la recharge de la page
  useEffect(() => {
    fetchCharData();
    fetchComData();
  }, []);

  // check
  if (isCharLoaded) {
    // on check le contenu de datachar
    console.log("data comics :", dataChar);
  }
  if (isComLoaded) {
    // on check le contenu de datacom
    console.log("data comics :", dataCom);
  }

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
