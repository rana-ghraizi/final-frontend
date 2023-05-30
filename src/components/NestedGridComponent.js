import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NestedGridComponent = ({ paintings }) => {
  const [nestedPaintings, setNestedpaintings] = useState([]);

  // fetch 4 paintings to the inner grid
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch(
          "https://artistic-u8a3.onrender.com/painting"
        );
        const data = await response.json();
        const nextFourPaintings = data.slice(3, 7); // Get the next 4 objects
        setNestedpaintings(nextFourPaintings);
        // console.log(nextFourPaintings);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPaintings();
  }, []);

  return (
    <div className="home4-content2">
      {nestedPaintings.map((item) => (
        <div key={item._id} className="image-container">
          <Link className="view-button" to={`/paintings/${item._id}`}>
            <img src={item.image.url} alt={item.title} className="home4-pic2" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NestedGridComponent;
