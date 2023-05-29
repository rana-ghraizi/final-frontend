import React, { useState } from "react";
import { Navbar, MenuBar } from "../../components/navbar/Navbar";
import "./Aboutus.css";
import img1 from "../../Images/image 19.png";
import img2 from "../../Images/image 18.png";
import Footer from "../../components/footer/Footer";

const Aboutus = () => {
  const [menubar, setMenuBar] = useState(false);

  return (
    <div>
      <Navbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />
      <div className="about-header">
        <p className="about-title">
          About Artistic
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Yellowtail"
          />
        </p>
        <p className="about-parag">
          We believe that art is an expression of the soul and should be
          accessible to everyone, which is why we created Artistic, which allows
          artists to share their passion with the world. Our platform acts as a
          stepping stone for emerging artists, offering them exposure,
          recognition, and opportunities for growth. We believe that supporting
          these artists not only benefits them individually but also enriches
          the art world as a whole by bringing fresh perspectives and unique
          voices to the forefront.
        </p>
      </div>
      <div className="collections">
        <div className="collection-1">
          <img src={img1} alt="img" className="about-img" />
          <div className="mission-div">
            <h2 className="mission-h2">Our Mission</h2>
            <p className="mission-p">
              Our mission is to build a vibrant community of artists and art
              enthusiasts, fostering appreciation and support for each other's
              work. We strive to create an ecosystem that empowers artists to
              share their creativity with the world. With a focus on seamless
              experiences, we offer a curated selection of artwork. Our platform
              celebrates artistic expression and encourages the discovery of
              remarkable artwork that deeply resonates with each individual.
            </p>
          </div>
        </div>
        <div className="collection-2">
          <div className="mission-div mission-div-2">
            <h2 className="mission-h2">Our Vision</h2>
            <p className="mission-p">
              We strongly believe in the power of art to inspire, provoke
              thought, and bring joy to our lives. That's why we are committed
              to supporting artists by providing them with a platform to
              showcase their work, gain exposure, and connect with a global
              audience. We strive to create a fair and transparent environment
              that promotes artist empowerment and ensures they receive the
              recognition and financial reward they deserve.
            </p>
          </div>
          <img src={img2} alt="img" className="about-img about-img-2" />

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;

// to do tomorrow:
// 1. About us page
// 4. login/register resposivity on tablets
