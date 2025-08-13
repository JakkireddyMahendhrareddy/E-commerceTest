import React from "react";
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

        {/* Products Data Section - Takes remaining space */}
        <div className="w-full mt-10 mb-10 flex-1 order-1 lg:order-2">
          <ProductsData />
        </div>
      </div>

      <Fotter />
    </>
  );
};

export default Products;
