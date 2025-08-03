import React from "react";
import { FcGenericSortingAsc } from "react-icons/fc";
import { useState } from "react";
import { Link } from "react-router-dom";
import { eachProduct } from "./prodctDummyData";

import { FaStar } from "react-icons/fa6";

const ProductsData = () => {
  const [sortValue, setSortValue] = useState("");

  const handleChange = (e) => {
    setSortValue(e.target.value);
    onSortChange(e.target.value);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl font-bold mb-2 tracking-normal   rounded-xl">
          All Products
        </h1>
        <div className="flex flex-row items-center space-x-4 bg-transparent rounded-xl">
          <FcGenericSortingAsc className="w-6 h-6" />

          <h1 className="text-lg font-semibold text-gray-800">Sort by</h1>

          <select
            value={sortValue}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="high">Price (High to Low)</option>
            <option value="low">Price (Low to High)</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {eachProduct.map((each, index) => (
          <li className="list-none" key={each.id}>
            <Link to={`/products/${each.id}`} state={{ product: each }}>
              <div className="max-w-xs rounded-2xl mb-3 overflow-hidden shadow-lg bg-white">
                <img
                  className="w-full h-48 object-cover"
                  src={each.image}
                  alt={each.name}
                />
                <div className="p-4">
                  <h5 className="text-xl font-semibold mb-2">{each.name}</h5>
                  <p className="text-gray-700 text-sm mb-1 leading-6">
                    {each.description}
                  </p>
                  <h6 className="text-sm text-red-500 mb-3 font-semibold ">
                    {each.category}
                  </h6>
                  <div className="flex flex-row justify-between items-center">
                    <h5 className="text-lg font-semibold mb-2">
                      {each.price}/-
                    </h5>
                    <button className="inline-flex items-center gap-1 px-5 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition">
                      {each.rating}
                      <FaStar />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ProductsData;
