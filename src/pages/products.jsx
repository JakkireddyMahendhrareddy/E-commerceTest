import React from "react";
import "../styles/button.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("productData")) || [];
    setProducts(storedData);
  }, []);

  const deleteProduct = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      localStorage.removeItem("productData");
      setProducts([]);
      navigate("/add-products");
    }
  };

  return (
    <div>
      <ul className="flex flex-roe  mt-5">
        <div className="grid grid-cols-4 space-x-5 ">
          {products.map((res, index) => (
            <li key={index} className="mb-3">
              <div className="flex flex-col ml-2 bg-blue-100 border-1 w-[20vw] border-black  rounded-2xl">
                <div className=" flex flex-col  justify-start items-start">
                  <img
                    src={res.url}
                    alt="images"
                    width="150"
                    height="100"
                    className="w-full h-50 rounded-2xl rounded-b-none"
                  />
                  <div className="p-3 flex flex-col  justify-center items-start">
                    <h1 className="text-sm text-green-900 font-bold">
                      <span className="text-xl text-red-900 ">name: </span>
                      {res.name}
                    </h1>
                    <p className="text-sm  text-green-900 font-medium">
                      <span className="text-xl text-red-900 font-bold">
                        price:
                      </span>{" "}
                      ${res.price}
                    </p>
                    <p className="text-lg  text-green-900 font-medium">
                      <span className="text-xl text-red-900 font-bold">
                        product Details:
                      </span>
                      {res.info}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center space-x-2 mb-2">
                  <button type="button" className="custom-button">
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={deleteProduct}
                    className="custom-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Products;
