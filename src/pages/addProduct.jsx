import React from "react";
import { useState } from "react";
import "../styles/button.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    url: "",
    price: 0,
    info: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    const { name, url, price, info } = values;
    const storeData = JSON.parse(localStorage.getItem("productData")) || [];
    const newData = [...storeData, { name, price, url, info }];
    localStorage.setItem("productData", JSON.stringify(newData));
    navigate("/products");
    setValues({ name: "", url: "", price: 0, info: "" });
  };

  return (
    <div className="flex flex-col items-center mt-4 p-4 bg-white mb-2 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Add Products</h1>
      <form
        onSubmit={handlesubmit}
        className="flex flex-col justify-center items-start space-y-4 w-full max-w-md"
      >
        <div className="w-100 border-2 border-amber-700 p-5 rounded-xl">
          <label htmlFor="name" className="block mb-2 font-medium">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="border-2 border-black w-full p-1 shadow-md rounded"
          />
          <label htmlFor="img" className="block mb-2 mt-4 font-medium">
            Product Img
          </label>
          <input
            id="img"
            name="url"
            type="text"
            value={values.url}
            onChange={handleChange}
            placeholder="Image link"
            className="border-2 border-black w-full p-1 shadow-md rounded"
          />

          <label htmlFor="value" className="block mb-2 mt-4 font-medium">
            Price
          </label>
          <input
            id="value"
            name="price"
            type="number"
            value={values.price}
            onChange={handleChange}
            placeholder="Enter product price"
            className="border-2 border-black w-full p-1 shadow-md rounded"
          />

          <label htmlFor="info" className="block mb-2 mt-4 font-medium">
            Information
          </label>

          <textarea
            id="info"
            name="info"
            value={values.info}
            onChange={handleChange}
            placeholder="Enter product info"
            className="border-2 border-black w-full p-1 shadow-md rounded"
            rows="5"
          />

          <div className="flex justify-center items-center">
            <button type="submit" className="custom-button">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
