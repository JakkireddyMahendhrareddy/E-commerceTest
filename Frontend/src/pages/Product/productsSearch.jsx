import React from "react";
import { FaSearch, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductsSearch = () => {
  return (
    <div className="flex flex-col space-x-5">
      <div className="flex items-center w-full sm:w-96 border-1 border-black hover:border-blue-700 rounded-lg overflow-hidden shadow">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-3 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-3 hover:bg-gray-400 cursor-pointer ">
          <FaSearch />
        </button>
      </div>

      <div className="flex flex-col justify-start items-start space-y-3 mt-5">
        <h1 className="text-2xl text-blue-600 font-bold tracking-wide decoration-gray-500 underline">
          Category
        </h1>
        <ul className="list-none font-bold leading-loose tracking-wide space-y-2 text-black">
          <li>Clothing</li>
          <li>Electronics</li>
          <li>Appliance</li>
          <li>Grocery</li>
          <li>Toys</li>
        </ul>
      </div>
      <div className="flex flex-col justify-start items-start space-y-3 mt-5">
        <h1 className="text-2xl text-blue-600 font-bold tracking-wide decoration-gray-500 underline">
          Rating
        </h1>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row gap-5 items-center">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
            <FaRegStar />
            <h1 className="font-bold">& up</h1>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <FaStarHalfAlt />
            <FaStarHalfAlt />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <h1 className="font-bold">& up</h1>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <h1 className="font-bold">& up</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSearch;
