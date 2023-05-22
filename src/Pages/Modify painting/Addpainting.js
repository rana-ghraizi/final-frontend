import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
        const response = await fetch("http://localhost:5000/category");
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
      formData.append("image", selectedImage)

      const response = await axios.post(
        `http://localhost:5000/painting/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("hhhh", formData);
      Swal.fire({
        title: "Product added successfully!",
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
    <div>
      <form className="product-edit-form" onSubmit={handleAddSubmit} ref={form}>
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
          Add painting
        </button>
      </form>
    </div>
  );
};

export default Addpainting;
