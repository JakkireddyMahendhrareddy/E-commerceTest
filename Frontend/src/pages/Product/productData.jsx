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
      {/* Header Section - Made Responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-normal rounded-xl">
          All Products
        </h1>
        <div className="flex flex-row items-center space-x-2 sm:space-x-4 bg-transparent rounded-xl w-full sm:w-auto">
          <FcGenericSortingAsc className="w-5 h-5 sm:w-6 sm:h-6" />
          <h1 className="text-base sm:text-lg font-semibold text-gray-800">
            Sort by
          </h1>
          <select
            value={sortValue}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
          >
            <option value="high">Price (High to Low)</option>
            <option value="low">Price (Low to High)</option>
          </select>
        </div>
      </div>

      {/* Products Grid - Made Responsive */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-4 px-2 md:px-0">
        {eachProduct.map((each, index) => (
          <li className="list-none" key={each.id}>
            <Link to={`/products/${each.id}`} state={{ product: each }}>
              <div className="w-full max-w-xs mx-auto rounded-2xl mb-3 overflow-hidden shadow-lg bg-white flex flex-col h-full transition-transform duration-200 hover:scale-105">
                <img
                  className="w-full h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 object-cover"
                  src={each.image}
                  alt={each.name}
                />
                <div className="p-2 xs:p-3 sm:p-4 flex flex-col flex-1 justify-between">
                  <h5 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold mb-2 line-clamp-1">
                    {each.name}
                  </h5>
                  <p className="text-gray-700 text-xs sm:text-sm mb-1 leading-6 line-clamp-2">
                    {each.description}
                  </p>
                  <h6 className="text-xs sm:text-sm text-red-500 mb-2 font-semibold">
                    {each.category}
                  </h6>
                  <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 xs:gap-0 mt-auto">
                    <h5 className="text-sm xs:text-base sm:text-lg font-semibold mb-0 xs:mb-2">
                      Rs:{each.price}/-
                    </h5>
                    <button className="inline-flex items-center gap-1 px-2 xs:px-3 sm:px-5 py-1 sm:py-2 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-600 transition">
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
