import "./footer.css";
import logo from "../../Images/Logo 2.png";
import { Link } from "react-router-dom";
import pic from '../../Images/Group 23.png'
import { animateScroll } from 'react-scroll';

const Footer = () => {
  const handleLinkClick = () => {
    animateScroll.scrollToTop();
  };
  return (
    <div className="footer-container">
      <div>
      <Link to="/">
        <img src={logo} alt="logo" className="footer-logo" />
        </Link>
      </div>
      <div className="about-footer">
        <h2 className="about-footer-h2">RESOURCES</h2>
        <div className="footer-container-p">
          <Link className="about-footer-li" to={"/"} onClick={handleLinkClick}>
            Home
          </Link>
          <Link className="about-footer-li" to={"/aboutus"} onClick={handleLinkClick}>
            About Us
          </Link>
          <Link className="about-footer-li" to={"/paintings"} onClick={handleLinkClick}>
            Paintings
          </Link>
          <Link className="about-footer-li" to={"/register"} onClick={handleLinkClick}>
            Get Started
          </Link>
        </div>
      </div>
      <div className="Contact-footer">
        <h2 className="Contact-footer-h2">FOLLOW US</h2>
        <p className="Contact-footer-p">+961 70 837 882</p>
      </div>
      <div>
        <img src={pic} alt="pic"  className="question-footer"/>
      </div>
    </div>
  );
};
export default Footer;
