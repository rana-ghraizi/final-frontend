import React, { useEffect, useState } from "react";
import image1 from "../../Images/Group_1.png";
import "./Home.css";
import pic1 from "../../Images/image7 1.png";
import pic2 from "../../Images/heart outline.png";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import NestedGridComponent from "../../components/NestedGridComponent";
import { Navbar, MenuBar } from "../../components/navbar/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { animateScroll } from 'react-scroll';

const Home = () => {
  const [paintings, setPaintings] = useState([]);
  const [menubar, setMenuBar] = useState(false);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch(
          "https://artistic-u8a3.onrender.com/painting"
        );
        const data = await response.json();
        const firstThreePaintings = data.slice(0, 3); // Get the first 3 objects
        setPaintings(firstThreePaintings);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPaintings();
  }, []);

  const quotes = [
    "Every human is an artist. The dream of your life is to make beautiful art.",
    "A work of art which did not begin in emotion is not art.",
    "A true artist is not one who is inspired, but one who inspires others.",
  ];

  const carouselSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the speed (in milliseconds) as desired
  };
  const handleLinkClick = () => {
    animateScroll.scrollToTop();
  };
  

  return (
    <>
      <Navbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />{" "}
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
        <h1 className="home2-title">
          Who Are We?
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Yellowtail"
          />
        </h1>
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
            <Link to={"/aboutus"} className="home2-button" onClick={handleLinkClick}>
              Read more
            </Link>
            <img src={pic2} alt="image2" className="home2-line" />
          </div>
        </div>
      </div>
      <div className="home3-wrapper">
        <Slider {...carouselSettings}>
          {quotes.map((quote, index) => (
            <div key={index}>
              <p className="home3-content"> “{quote}”</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="home4-wrapper">
        <h1 className="home2-title">Quick View</h1>
        <div className="home4-content">
          <NestedGridComponent paintings={paintings} />
          {paintings.map((item) => (
            <div key={item._id}>
              <Link className="view-button" to={`/paintings/${item._id}`} onClick={handleLinkClick}>
                <img
                  src={item.image.url}
                  alt={item.title}
                  className="home4-pic1"
                />
              </Link>
            </div>
          ))}
        </div>

        <Link to={"/paintings"} className="home-viewmore" onClick={handleLinkClick}>
          <span>View more</span>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Home;
