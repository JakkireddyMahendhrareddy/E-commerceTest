import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const SimilarProducts = ({ similar }) => {
  return (
    <div className="flex flex-col justify-center mt-10 mb-5 items-start px-4 sm:px-6 md:px-8 lg:px-10  w-full gap-6 sm:gap-8 md:gap-10">
      <h5 className="text-xl sm:text-2xl md:text-3xl font-bold">
        Similar Products
      </h5>

      {/* Products Container */}
      <div className="flex flex-row w-full">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-4 w-full">
          {similar.map((item) => (
            <li
              key={item.id}
              className="list-none w-full max-w-xs mx-auto rounded-2xl mb-3 overflow-hidden shadow-lg bg-white transition-transform duration-200 hover:scale-105"
            >
              <Link to={`/products/${item._id}`}>
                {/* Product Image - Responsive height */}
                <img
                  className="w-full h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 object-cover"
                  src={item.image}
                  alt={item.name}
                />

                {/* Product Content - Responsive padding */}
                <div className="p-2 xs:p-3 sm:p-4">
                  {/* Product Name - Responsive text size */}
                  <h5 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold mb-2 line-clamp-2">
                    {item.name}
                  </h5>

                  {/* Product Description - Responsive text size */}
                  <p className="text-gray-700 text-xs sm:text-sm mb-1 leading-5 sm:leading-6 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Category - Responsive text size */}
                  <h6 className="text-xs sm:text-sm text-red-500 mb-2 sm:mb-3 font-semibold">
                    {item.category}
                  </h6>

                  {/* Price and Rating - Responsive layout */}
                  <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 xs:gap-0">
                    {/* Price - Responsive text size */}
                    <h5 className="text-sm xs:text-base sm:text-lg font-semibold mb-0 xs:mb-2">
                      Rs: {item.price}/-
                    </h5>

                    {/* Rating Button - Responsive sizing */}
                    <button className="inline-flex items-center gap-1 px-2 xs:px-3 sm:px-4 md:px-5 py-1 sm:py-2 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-600 transition">
                      {item.rating}
                      <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </div>
      </div>

      {/* No Similar Products Message */}
      {similar.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 w-full">
          <div className="text-gray-400 text-3xl sm:text-4xl mb-3">🔍</div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-1">
            No Similar Products Found
          </h3>
          <p className="text-sm text-gray-500 text-center">
            We couldn't find any similar products in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default SimilarProducts;
