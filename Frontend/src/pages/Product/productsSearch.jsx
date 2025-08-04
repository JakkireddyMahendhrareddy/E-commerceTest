import React from "react";
import { FaSearch, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const categories = ["Clothing", "Electronics", "Appliance", "Grocery", "Toys"];

const ratings = [
  [
    <FaStar key="1" />,
    <FaStar key="2" />,
    <FaStar key="3" />,
    <FaRegStar key="4" />,
    <FaRegStar key="5" />,
  ],
  [
    <FaStarHalfAlt key="1" />,
    <FaStarHalfAlt key="2" />,
    <FaRegStar key="3" />,
    <FaRegStar key="4" />,
    <FaRegStar key="5" />,
  ],
  [
    <FaRegStar key="1" />,
    <FaRegStar key="2" />,
    <FaRegStar key="3" />,
    <FaRegStar key="4" />,
    <FaRegStar key="5" />,
  ],
];

const ProductsSearch = () => {
  return (
    <div className="flex flex-col space-y-5">
      {/* Search Input - Made Responsive */}
      <div className="flex items-center w-full sm:w-80 md:w-96 border border-black hover:border-blue-700 rounded-lg overflow-hidden shadow">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-400 cursor-pointer">
          <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Category List - Made Responsive */}
      <div className="mt-3 sm:mt-5">
        <h1 className="text-xl sm:text-2xl text-blue-600 font-bold underline">
          Category
        </h1>
        <ul className="mt-2 space-y-1 sm:space-y-2 text-black font-bold">
          {categories.map((category, index) => (
            <li
              key={index}
              className="text-sm sm:text-base cursor-pointer hover:text-blue-600 transition-colors duration-200 py-1"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Rating List - Made Responsive */}
      <div className="mt-3 sm:mt-5">
        <h1 className="text-xl sm:text-2xl text-blue-600 font-bold underline">
          Rating
        </h1>
        <div className="mt-2 space-y-1 sm:space-y-2">
          {ratings.map((stars, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-5 cursor-pointer hover:text-yellow-500 transition-colors duration-200 py-1"
            >
              <div className="flex items-center text-sm sm:text-base">
                {stars.map((star, starIndex) => (
                  <span key={starIndex} className="w-3 h-3 sm:w-4 sm:h-4">
                    {star}
                  </span>
                ))}
              </div>
              <span className="font-bold text-sm sm:text-base">& up</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSearch;
