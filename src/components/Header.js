import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/Marvel-Logo.png";
import "./Header.css";

const Header = ({ context, setContext }) => {
  const [location, setLocation] = useState("Personnages");
  return (
    <div className="header">
      <div className="container">
        <div className="header-top">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <ul className="menu">
            <Link to="/">
              <li
                onClick={() => {
                  setLocation("Personnages");
                }}
                className={location === "Personnages" ? "isSelected" : null}
              >
                Personnages
              </li>
            </Link>
            <Link to="/comics">
              <li
                onClick={() => {
                  setLocation("Comics");
                }}
                className={location === "Comics" ? "isSelected" : null}
              >
                Comics
              </li>
            </Link>
            <Link to="/favorites">
              <li
                onClick={() => {
                  setLocation("Favoris");
                }}
                className={location === "Favoris" ? "isSelected" : null}
              >
                Favoris
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
