import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Paintings.css";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Select from "react-select";


const Paintings = () => {
  const [paintings, setPaintings] = useState([]);
  const [title, setTitle] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  // fetch paintings
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch("http://localhost:5000/painting");
        const data = await response.json();
        setPaintings(data);
        // console.log(data);
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
        const response = await fetch("http://localhost:5000/category");
        const data = await response.json();
        setTitle(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTitle();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
  };

  const options = title.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  // fetch paintings by categories
  useEffect(() => {
    const fetchProductsByCategory = async (categoryId) => {
      try {
        const response = await fetch(
          `http://localhost:5000/painting/category/${categoryId}`
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
          const response = await fetch("http://localhost:5000/painting");
          const data = await response.json();
          setPaintings(data);
          // console.log(data);
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchPaintings();
    }
  }, [categoryId]);

  return (
    <div>
      <Navbar />
      {/* <Slider {...settings} className="Slider">
        {title &&
          title.map((item) => (
            <div key={item._id}>
              <button
                className="title-carousel"
                onClick={() => handleCategoryClick(item._id)}
              >
                {item.title}
              </button>
            </div>
          ))}
      </Slider> */}
      <div className="dropdown-menu">
        <Select
          className="dropdown-select"
          options={options}
          value={categoryId}
          onChange={handleCategoryClick}
          placeholder="Select a Category"
        />
      </div>
      <div className="paintings-content">
        {/* {console.log(paintings)} */}
        {paintings.map((item) => (
          <div key={item._id} className="painting-container">
            <img src={item.image.url} alt={item.title} className="painting" />
            <div className="overlay">
              <Link className="view-button" to={`/paintings/${item._id}`}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paintings;
