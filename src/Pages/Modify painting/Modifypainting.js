import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar, MenuBar } from "../../components/navbar/Navbar";
import Swal from "sweetalert2";
import axios from "axios";

const Modifypainting = () => {
  const [menubar, setMenuBar] = useState(false);
  const { paintingId } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const userId = sessionStorage.getItem("Id");

  const [painting, setPainting] = useState({
    userId: userId,
    title: "",
    description: "",
    // image: "",
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
      formData.append("image", selectedImage)

      const response = await axios.put(
        `http://localhost:5000/painting/${paintingId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: "Product updated successfully!",
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
      console.log(formData);
      console.log("hello", selectedImage);
      // window.location.href = "/profile";
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
          `http://localhost:5000/painting//${paintingId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPainting();
          window.location.href = "/profile";
        } else {
          console.error("Failed to remove item");
        }
      }
    });
  };

  const form = useRef();

  return (
    <div>
      <Navbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />
      <button onClick={handleDelete}>Delete painting</button>
      <form
        className="product-edit-form"
        onSubmit={handleEditSubmit}
        ref={form}
      >
        <div className="username">
          <label className="About_username">Painting title:</label> <br />
          <input
            className="product-edit-input"
            type="text"
            id="username"
            placeholder="Painting title"
            name="title"
            value={painting.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="username">
          <label className="About_username">Description:</label> <br />
          <textarea
            className="product-edit-input"
            type="text"
            id="username"
            placeholder="discription"
            name="description"
            value={painting.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="username">
          <label className="About_username">Uplaod image:</label> <br />
          <input
            className="product-edit-input"
            id="username"
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div className="username">
          <label className="About_username">Category:</label> <br />
          <select
            id="category"
            name="categoryId"
            value={painting.categoryId}
            onChange={handleInputChange}
          >
            <option value="">Select a category...</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="username">
          <label className="About_username">Price:</label> <br />
          <input
            className="product-edit-input"
            type="number"
            id="username"
            placeholder="Price"
            name="price"
            value={painting.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="username">
          <label className="About_username">Size:</label> <br />
          <input
            className="product-edit-input"
            type="text"
            id="username"
            placeholder="Size"
            name="size"
            value={painting.size}
            onChange={handleInputChange}
          />
        </div>
        <button className="product-edit-button" type="submit">
          Update painting
        </button>
      </form>
    </div>
  );
};

export default Modifypainting;
