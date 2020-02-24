import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import "./Character.css";

const Character = ({ setFavoriteComics, favoriteComics }) => {
  // init history
  const history = useHistory();

  // récupération du paramètre de l'url
  const { id } = useParams();

  // déclaration des states
  const [data, setData] = useState();
  const url =
    "https://mybackend-marvel.herokuapp.com/characters/" + id + "/comics";
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    try {
      // récupération des données sur le backend
      const response = await axios.get(url);
      console.log("retour du backend", response.data.results);
      // on stock la réponse dans un état
      setData(response.data.results);
      // on dit que la page est chargée
      setIsLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  // lancement à la recharge de la page
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="character">
      <div className="container">
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h2 style={{ color: "white" }}>Comics liés au personnage</h2>
        </div>
        <div className="result">
          {isLoaded && data.length > 0 ? (
            data.map((elem, index) => {
              return (
                <Card
                  id={elem.id}
                  key={elem.id}
                  title={elem.title}
                  picture={elem.thumbnail.path + "." + elem.thumbnail.extension}
                  description={elem.description}
                  context="comics"
                />
              );
            })
          ) : (
            <div className="charging">Chargement en cours</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Character;
