import React from "react";
import "./Footer.css";
import logo from "../../Images/Logo 2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-container-1">
      <div>
        <img src={logo} alt="Artistic" className="footer-logo" />
      </div>
      <div className="about-footer">
        <h2>RESOURCES</h2>
        <div className="about-footer-div">
          <Link className="about-footer-li" to={"/"}>
            Home
          </Link>
          <Link className="about-footer-li" to={"/aboutus"}>
            About Us
          </Link>
          <Link className="about-footer-li" to={"/paintings"}>
            Paintings
          </Link>
          <Link className="about-footer-li" to={"/login"}>
            Get Started
          </Link>
        </div>
      </div>
      <div className="Contact-footer">
        <h2>FOLLOW US</h2>
        <p className="Contact-footer-p">+961 70 837 882</p>
      </div>
      </div>
    </div>
  );
};

export default Footer;
