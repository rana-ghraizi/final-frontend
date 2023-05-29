import React from "react";
import logo from "../../Images/Logo 2.png";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import menu from "../../Images/Menu.png";


const Navbar = ({ setMenuBar, menubar }) => {
  const location = useLocation()
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
            <Link to="/" className={`navlinks ${location.pathname === '/' ? 'active' : ""}`}>Home</Link>
          </button>
          <button className="navnavbar-button">
            <Link to="/aboutus" className={`navlinks ${location.pathname === '/aboutus' ? 'active' : ""}`}>About Us</Link>
          </button>
          <button className="navnavbar-button">
            <Link to="/paintings" className={`navlinks ${location.pathname === '/paintings' ? 'active' : ""}`}>Paintings</Link>
          </button>
          <button className="navnavbar-button">
            <Link to="/register" className={`navlinks ${location.pathname === '/register' ? 'active' : ""}`}>Get Started</Link>
          </button>
        </div>
        <div className="navbar-user">
          <div className="navnavbar-contact">
            <button className="navcontact-button">
              <Link to="/cart" className={`navlinks ${location.pathname === '/cart' ? 'active' : ""}`}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
            </button>
            <button className="navcontact-button">
              <Link to="/profile" className={`navlinks ${location.pathname === '/profile' ? 'active' : ""}`}>
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
  const location = useLocation()
  return (
    <div className={!menubar ? "navhidden_hidden" : "navhidden_show"}>
      <button className="navmenu-menu">
        <Link to="/" className={`navlinks ${location.pathname === '/' ? 'active' : ""}`}>Home</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/aboutus" className={`navlinks ${location.pathname === '/aboutus' ? 'active' : ""}`}>About Us</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/paintings" className={`navlinks ${location.pathname === '/paintings' ? 'active' : ""}`}>Paintings</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/register" className={`navlinks ${location.pathname === '/register' ? 'active' : ""}`}>Get Started</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/cart" className={`navlinks ${location.pathname === '/cart' ? 'active' : ""}`}>Cart</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/profile" className={`navlinks ${location.pathname === '/profile' ? 'active' : ""}`}>Profile</Link>
      </button>
    </div>
  );
};
export { Navbar, MenuBar };
