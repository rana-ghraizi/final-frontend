import React, { useEffect, useState } from "react";

const NestedGridComponent = ({ paintings }) => {
  const [nestedPaintings, setNestedpaintings] = useState([]);

    // fetch 4 paintings to the inner grid
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch("http://localhost:5000/painting");
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
        <div key={item.id} className="image-container">
          <img src={item.image.url} alt={item.title} className="home4-pic2" />
        </div>
      ))}
    </div>
  );
};

export default NestedGridComponent;
