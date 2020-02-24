import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./reset.css";

import Characters from "./containers/Characters";
import Character from "./containers/Character";
import Comics from "./containers/Comics";
import Header from "./components/Header";
import Favorites from "./containers/Favorites";
import "./App.css";

const App = () => {
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
  const listFavComics = strFavoriteComics.split(",").filter(elem => {
    return elem !== "";
  });
  const listFavCharacters = strFavoriteCharacters.split(",").filter(elem => {
    return elem !== "";
  });
  // check
  console.log("listFavComics", listFavComics);
  console.log("listFavCharacters", listFavCharacters);

  // on initialise les states avec ce qu'on récupère des cookies
  const [favoriteComics, setFavoriteComics] = useState(listFavComics);
  const [favoriteCharacters, setFavoriteCharacters] = useState(
    listFavCharacters
  );

  useEffect(() => {
    console.log("favoriteComics", favoriteComics);
    const strFavoriteComics = JSON.stringify(favoriteComics);
    console.log("strFavoriteComics", strFavoriteComics);
    Cookies.set("favoriteComics", strFavoriteComics);
  }, [favoriteComics]);

  useEffect(() => {
    console.log("favoriteCharacters", favoriteCharacters);
    const strFavoriteCharacters = JSON.stringify(favoriteCharacters);
    console.log("strFavoriteCharacters", strFavoriteCharacters);
    Cookies.set("favoriteCharacters", strFavoriteCharacters);
  }, [favoriteCharacters]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/favorites">
          <Favorites
            setFavoriteCharacters={setFavoriteCharacters}
            favoriteCharacters={favoriteCharacters}
            setFavoriteComics={setFavoriteComics}
            favoriteComics={favoriteComics}
          />
        </Route>
        <Route path="/characters">
          <Characters
            setFavoriteCharacters={setFavoriteCharacters}
            favoriteCharacters={favoriteCharacters}
          />
        </Route>
        <Route path="/comics/">
          <Comics
            setFavoriteComics={setFavoriteComics}
            favoriteComics={favoriteComics}
          />
        </Route>
        <Route path="/character/:id">
          <Character
            setFavoriteComics={setFavoriteComics}
            favoriteComics={favoriteComics}
          />
        </Route>
        <Route path="/">
          <Characters
            setFavoriteCharacters={setFavoriteCharacters}
            favoriteCharacters={favoriteCharacters}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
