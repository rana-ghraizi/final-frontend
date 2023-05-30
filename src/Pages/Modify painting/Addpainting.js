import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Addpainting = () => {
  const userId = sessionStorage.getItem("Id");
  const [selectedImage, setSelectedImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [painting, setPainting] = useState({
    title: "",
    description: "",
    categoryId: null,
    price: "",
    size: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPainting({ ...painting, [name]: value });
  };
  const handleImageChange = (event) => {
    console.log(event.target.files);
    setSelectedImage(event.target.files[0]);
  };

  // fetch categories
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch(
          "https://artistic-u8a3.onrender.com/category"
        );
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTitle();
  }, []);

  // add painting
  const handleAddSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      // for (const image of selectedImage) {
      //   formData.append("image", );
      // }
      console.log("sddad");
      formData.append("title", painting.title);
      formData.append("description", painting.description);
      formData.append("categoryId", painting.categoryId);
      formData.append("price", painting.price);
      formData.append("size", painting.size);
      formData.append("image", selectedImage);

      const response = await axios.post(
        `https://artistic-u8a3.onrender.com/painting/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("hhhh", formData);

      await Swal.fire({
        title: "Painting request received",
        text: "Your painting will be displayed once confirmed!",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "OK",
        customClass: {
          popup: "custom-style",
          title: "custom-style",
          confirmButton: "custom-style",
        },
      });

      // Update the state of the products with the new list
      setPainting(response.data);
      console.log(painting);
      window.location.href = "/profile";
    } catch (error) {
      console.error(error);
    }
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
          onSubmit={handleAddSubmit}
          ref={form}
        >
          <div className="username">
            <label className="update-Address">
              Artist Name
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
            <label className="update-Address">Painting Description:</label>{" "}
            <br />
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
                value={painting.categoryId || ""}
                onChange={handleInputChange}
                className="user-inputs"
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
          <div className="formadd-painting">
            <button className="logout" type="submit">
              Add painting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addpainting;
