import React from "react";
import logo from "../../Images/Logo 2.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar-content">
        <img src={logo} alt="logo" className="navbar-logo" />
        <div className="navnavbar-list">
          <button className="navnavbar-button">
            <Link to="/">Home</Link>
          </button>
          <button className="navnavbar-button">
            <Link to="/aboutus">About Us</Link>
          </button>
          <button className="navnavbar-button">
            <Link to="/paintings">Paintings</Link>
          </button>
          <button className="navnavbar-button">
            <Link to="/register">Get Started</Link>
          </button>
        </div>
        <div className="navbar-icons">
          <button className="navnavbar-cart">
            <Link to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </button>
          <button className="navnavbar-cart">
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
