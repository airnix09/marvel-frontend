import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import Card from "../components/Card";
import "./Character.css";

const Character = ({ setFavoriteComics, favoriteComics }) => {
  const location = useLocation();
  const { characterName } = location.state;

  // get id requested
  const { id } = useParams();

  const [data, setData] = useState();
  const url =
    "https://marvel-project-backend.herokuapp.com/characters/" + id + "/comics";
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data.results);
      setIsLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="character">
      <div className="container">
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h2 style={{ color: "white" }}>
            Comics liés au personnage {characterName}
          </h2>
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
                  setFavoriteComics={setFavoriteComics}
                  favoriteComics={favoriteComics}
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
