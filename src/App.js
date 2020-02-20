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
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    Cookies.set("favoris", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/characters">
          <Characters setFavorite={setFavorite} favorite={favorite} />
        </Route>
        <Route path="/comics/">
          <Comics setFavorite={setFavorite} favorite={favorite} />
        </Route>
        <Route path="/character/:id">
          <Character setFavorite={setFavorite} favorite={favorite} />
        </Route>
        <Route path="/">
          <Characters setFavorite={setFavorite} favorite={favorite} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
