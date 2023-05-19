import React, { useState } from "react";
import logo from "../../Images/Logo 2.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import menu from "../../Images/Menu.png";


const Navbar = ({ setMenuBar, menubar }) => {
  return (
    <div className="navbiggerthing">
      <div className="navnavbar">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className="navnavbar-logo" />
          </Link>
        </div>
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
        <div className="navbar-user">
          <div className="navnavbar-contact">
            <button className="navcontact-button">
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
            </button>
            <button className="navcontact-button">
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </button>
          </div>
        </div>
        <div className="navnavbar-menu">
          <button className="navmenu-button" id="navmenuButton">
            <img
              src={menu}
              alt="menu"
              className="navmenu"
              onClick={() => setMenuBar(!menubar)}
            />
          </button>
        </div>
        
      </div>
    </div>
  );
};

const MenuBar = ({ menubar }) => {
  return (
    <div className={!menubar ? "navhidden_hidden" : "navhidden_show"}>
      <button className="navmenu-menu">
        <Link to="/">Home</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/aboutus">About Us</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/paintings">Paintings</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/register">Get Started</Link>
      </button>
    </div>
  );
};
export { Navbar, MenuBar };
