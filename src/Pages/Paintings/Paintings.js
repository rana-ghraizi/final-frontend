import React, { useEffect, useState } from "react";
import { Navbar, MenuBar } from "../../components/navbar/Navbar";
import "./Paintings.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import Footer from "../../components/footer/Footer";
import { animateScroll } from 'react-scroll';


const Paintings = () => {
  const [paintings, setPaintings] = useState([]);
  const [title, setTitle] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [menubar, setMenuBar] = useState(false);
  
  // fetch paintings
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch(
          "https://artistic-u8a3.onrender.com/painting"
        );
        const data = await response.json();
        setPaintings(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPaintings();
  }, []);

  // fetch categories
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch(
          "https://artistic-u8a3.onrender.com/category"
        );
        const data = await response.json();
        setTitle(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTitle();
  }, []);

  const handleCategoryClick = (selectedOption) => {
    if (selectedOption) {
      const categoryId = selectedOption.value;
      setCategoryId(categoryId);
    } else {
      setCategoryId(null);
    }
  };

  const options = title.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  // fetch paintings by categories
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(
          `https://artistic-u8a3.onrender.com/painting/category/${categoryId}`
        );
        const data = await response.json();
        setPaintings(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (categoryId) {
      fetchProductsByCategory(categoryId);
    } else {
      const fetchPaintings = async () => {
        try {
          const response = await fetch(
            "https://artistic-u8a3.onrender.com/painting"
          );
          const data = await response.json();
          setPaintings(data);
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchPaintings();
    }
  }, [categoryId]);

  const handleLinkClick = () => {
    animateScroll.scrollToTop();
  };

  return (
    <div>
      <Navbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />
      <div className="page-header">
        <p className="page-title">
          Artistic Paintings
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Yellowtail"
          />
        </p>
        <div className="dropdown-menu">
          <Select
            className="dropdown-select"
            options={options}
            value={categoryId}
            onChange={handleCategoryClick}
            placeholder="Select a Category"
          />
        </div>
      </div>

      <div className="paintings-content">
        {paintings.map((item) => (
          <div key={item._id} className="painting-container">
            <Link className="view-button" to={`/paintings/${item._id}`} onClick={handleLinkClick}>
              <img src={item.image.url} alt={item.title} className="painting" />
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Paintings;
