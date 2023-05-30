import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "./Modifypainting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Modifypainting = () => {
  const { paintingId } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const userId = sessionStorage.getItem("Id");

  const [painting, setPainting] = useState({
    userId: userId,
    title: "",
    description: "",
    categoryId: null,
    price: "",
    size: "",
  });

  //   fetch painting by id
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

  // fetch categories
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch("http://localhost:5000/category");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTitle();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPainting({ ...painting, [name]: value });
  };
  const handleImageChange = (event) => {
    console.log(event.target.files);
    setSelectedImage(event.target.files[0]);
  };

// update painting data
const handleEditSubmit = async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData();
    // for (const image of selectedImage) {
    //   formData.append("image", image);
    // }
    formData.append("title", painting.title);
    formData.append("description", painting.description);
    formData.append("categoryId", painting.categoryId);
    formData.append("price", painting.price);
    formData.append("size", painting.size);
    formData.append("image", selectedImage);

    const response = await axios.put(
      `http://localhost:5000/painting/${paintingId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    await Swal.fire({
      title: "Painting updated successfully!",
      icon: "success",
      showCancelButton: false,
      confirmButtonText: "OK",
      customClass: {
        popup: "custom-style",
        title: "custom-style",
        confirmButton: "custom-style",
      },
    });

    // Update the state of the products with the new data
    setPainting(response.data);
    window.location.href = "/profile";
  } catch (error) {
    console.error(error);
  }
};


  //   delete painting
  const handleDelete = async () => {
    await Swal.fire({
      title: "Are you sure you want to delete this painting?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-style",
        title: "custom-style",
        confirmButton: "custom-style",
        cancelButton: "custom-style",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:5000/painting/${paintingId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPainting(data);
          window.location.href = "/profile";
        } else {
          console.error("Failed to remove item");
        }
      }
    });
  };

  const form = useRef();

  return (
    <div className="modify-wrapper">
      <div className="back">
        <Link to={"/profile"} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>
      <div className="modify-form">
        <form
          className="product-edit-form"
          onSubmit={handleEditSubmit}
          ref={form}
        >
          <div className="username">
            <label className="update-Address">
              Artist Name:
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Yellowtail"
              />
            </label>{" "}
            <br />
            <input
              className="user-inputs"
              type="text"
              id="username"
              placeholder="Name"
              name="title"
              value={painting.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="username">
            <label className="update-Address">Painting Description:</label> <br />
            <textarea
              className="user-inputs"
              type="text"
              id="username"
              placeholder="description"
              name="description"
              value={painting.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="image-cat">
            <div className="username">
              <label className="update-Address">Uplaod image:</label> <br />
              <input
                className="user-inputs"
                id="username"
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </div>
            <div className="username">
              <label className="update-Address">Category:</label> <br />
              <select
                id="category"
                name="categoryId"
                value={painting.categoryId || ''}
                onChange={handleInputChange}
                className="userrr--inputs"
              >
                <option value="">Select a category...</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="username">
            <label className="update-Address">Price:</label> <br />
            <input
              className="user-inputs"
              type="number"
              id="username"
              placeholder="Price"
              name="price"
              value={painting.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="username">
            <label className="update-Address">Size:</label> <br />
            <input
              className="user-inputs"
              type="text"
              id="username"
              placeholder="Size"
              name="size"
              value={painting.size}
              onChange={handleInputChange}
            />
          </div>
          <div className="modify-buttons">
            <button className="logout" type="submit">
              Update painting
            </button>
            <button onClick={handleDelete} className="logout">
              Delete painting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modifypainting;
