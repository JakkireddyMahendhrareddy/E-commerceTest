import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductsData from "./productData";
import ProductsSearch from "./productsSearch";
import Fotter from "../../components/Fotter";
import Navbar from "../../components/Navbar";
import PrimeDealsection from "./primeDealsection";

const Products = () => {
  return (
    <>
      <Navbar />

      {/* Main Container - Responsive padding and layout */}
      <div className="flex flex-col justify-center items-start px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 min-h-screen">
        {/* Prime Deal Section */}
        <div className="w-full">
          <PrimeDealsection />
        </div>

        {/* Products Section - Responsive layout */}
        <div className="w-full flex flex-col lg:flex-row justify-center gap-4 sm:gap-5 lg:gap-6 xl:gap-8 items-start mt-6 sm:mt-8 md:mt-10 min-h-screen">
          {/* Search Section - Responsive width and positioning */}
          <div className="w-full hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 order-2 lg:order-1">
            <ProductsSearch />
          </div>

          {/* Products Data Section - Takes remaining space */}
          <div className="w-full mb-10 flex-1 order-1 lg:order-2">
            <ProductsData />
          </div>
        </div>
      </div>

      <Fotter />
    </>
  );
};

export default Products;
