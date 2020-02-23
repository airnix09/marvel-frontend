import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./reset.css";

import Characters from "./containers/Characters";
import Character from "./containers/Character";
import Comics from "./containers/Comics";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  useEffect(() => {
    console.log(favoriteComics);
    Cookies.set("favoriteComics", JSON.stringify(favoriteComics));
  }, [favoriteComics]);

  useEffect(() => {
    console.log(favoriteCharacters);

    Cookies.set("favoriteCharacters", JSON.stringify(favoriteCharacters));
  }, [favoriteCharacters]);

  return (
    <Router>
      <Header />
      <Switch>
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
