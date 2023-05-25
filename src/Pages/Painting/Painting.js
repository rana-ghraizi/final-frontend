import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Painting.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Navbar, MenuBar } from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Painting = () => {
  const [painting, setPainting] = useState([]);
  const [cartStatus, setCartStatus] = useState([]);
  const { paintingId } = useParams();
  const [menubar, setMenuBar] = useState(false);

  const userId = sessionStorage.getItem("Id");
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/painting/${paintingId}`
        );
        const data = await response.json();
        setPainting(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPainting();
  }, [paintingId]);

  // add to cart
  const handleCart = async (event, paintingId) => {
    event.preventDefault();
    console.log(paintingId);
    if (userId) {
      try {
        const response = await axios.post(
          `http://localhost:5000/cart/${userId}`,
          {
            paintingId: paintingId,
          }
        );
        setCartStatus("sucssful", response.data);
        Swal.fire({
          title: "Product added to cart!",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
          customClass: {
            popup: "custom-style",
            title: "custom-style",
            confirmButton: "custom-style",
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
    // else if ( role === 'Artist') {
    //   const result = await
    //   Swal.fire({
    //     title: "You should to be a user to add items to your cart",
    //     showCancelButton: true,
    //     confirmButtonText: "Log in",
    //     customClass: {
    //       popup: "custom-style",
    //       title: "custom-style",
    //       confirmButton: "custom-style",
    //     },
    //   });
    // }
    else {
      const result = await Swal.fire({
        title: "You need to be logged in to add items to your cart",
        showCancelButton: true,
        confirmButtonText: "Log in",
        customClass: {
          popup: "custom-style",
          title: "custom-style",
          confirmButton: "custom-style",
        },
      });
      if (result.isConfirmed) {
        window.location.href = "/login";
      }
    }
  };

  return (
    <div>
      <Navbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />
      <div className="painting--container">
        <div className="back">
          <Link to={"/paintings"} className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>
        <div className="painting--image">
          {painting.image && (
            <img
              src={painting.image.url}
              alt={painting.title}
              className="painting-image"
            />
          )}
        </div>
        <div className="detalis-bg">
          <div className="painting-content">
            {!painting.soldOut ? (
              <>
                <h1 className="painting-content-h1">
                  {painting.title}{" "}
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Yellowtail"
                  />
                </h1>
                <p className="painting-content-p">{painting.description}</p>
                <p className="painting-content-p">
                  <strong>Price:</strong> $ {painting.price}
                </p>
                <p className="painting-content-p">
                  <strong>Size:</strong> {painting.size} cm
                </p>
                <button
                  onClick={(event) => handleCart(event, painting._id)}
                  className="painting-content-button"
                >
                  Add to cart
                </button>
              </>
            ) : (
              <div className="sold-out"></div>
            )}
          </div>
        </div>
        <div className="detalis--bg">
          <div className="painting-content">
            {!painting.soldOut ? (
              <>
                <h1 className="painting-content-h1">
                  {painting.title}{" "}
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Yellowtail"
                  />
                </h1>
                <p className="painting-content-p">{painting.description}</p>
                <p className="painting-content-p">
                  <strong>Price:</strong> $ {painting.price}
                </p>
                <p className="painting-content-p">
                  <strong>Size:</strong> {painting.size} cm
                </p>
                <button
                  onClick={(event) => handleCart(event, painting._id)}
                  className="painting-content-button"
                >
                  Add to cart
                </button>
              </>
            ) : (
              <div className="sold-out"></div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Painting;
