import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/Marvel-Logo.png";
import "./Header.css";

const Header = ({ context, setContext }) => {
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
              <li>Personnages</li>
            </Link>
            <Link to="/comics">
              <li>Comics</li>
            </Link>
            <Link to="/favorites">
              <li>Favoris</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
