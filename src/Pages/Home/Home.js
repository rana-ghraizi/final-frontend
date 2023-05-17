import React from "react";
import Navbar from "../../components/navbar/Navbar";
import image1 from "../../Images/Group_1.png";
import "./Home.css";
import pic1 from "../../Images/image7 1.png";
import pic2 from "../../Images/heart outline.png";
import pic3 from "../../Images/image13.jpeg";
import pic4 from "../../Images/image 31.png";
import pic5 from "../../Images/image14.webp";
import pic6 from "../../Images/image9.jpeg";
import pic9 from "../../Images/image_1428.jpeg";
import pic8 from "../../Images/Painting-Mantra-Oil-Colors-Canvas-SDL554796877-1-dd3b5 1.png";
import pic7 from "../../Images/image3.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home1-wrapper">
        <div>
          <h1 className="home-title">
            Welcome <br /> to Artistic
          </h1>
          <p className="home-slogan">where your dreams come true!</p>
        </div>
        <div className="home-group1">
          <img src={image1} alt="hero portaits" className="home-group1-img" />
        </div>
      </div>
      <div className="home2-wrapper">
        <h1 className="home2-title">Who Are We?</h1>
        <div className="home-group2">
          <img src={pic1} alt="image1" className="home-pic1" />
          <div className="home2-content">
            <p className="home-group2-p">
              We believe that art is an expression of the soul and should be
              accessible to everyone, which is why we created Artistic, which
              allows artists to share their passion with the world. <br />{" "}
              <br />
              Our mission is to create a community of artists and art
              enthusiasts where everyone can come together to appreciate and
              support each other's work.
            </p>
            <Link to={"/aboutus"} className="home2-button">
              Read more
            </Link>
            <img src={pic2} alt="image2" className="home2-line"/>
          </div>
        </div>
      </div>
      <div className="home3-wrapper">
        <p className="home3-content">
          “Every human is an artist. <br />
          The dream of your life is to make beautiful art.”
        </p>
      </div>
      <div className="home4-wrapper">
        <h1 className="home2-title">Quick View</h1>
        <div className="home4-content">
          <img src={pic3} alt="image3" className="home4-pic1" />
          <div className="home4-content2">
            <img src={pic4} alt="image3" className="home4-pic2" />
            <img src={pic5} alt="image3" className="home4-pic2" />
            <img src={pic6} alt="image3" className="home4-pic2" />
            <img src={pic7} alt="image3" className="home4-pic2" />
          </div>
          <img src={pic8} alt="image3" className="home4-pic1" />
          <img src={pic9} alt="image3" className="home4-pic1" />
        </div>
      </div>
    </div>
  );
};

export default Home;
