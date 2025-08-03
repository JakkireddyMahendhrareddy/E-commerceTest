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
      <div className="flex flex-col justify-center items-start px-10 min-h-screen">
        <PrimeDealsection />
        <div className="flex felx-row justify-center gap-5 items-start px-10 mt-10 min-h-screen">
          <ProductsSearch />
          <ProductsData />
        </div>
      </div>
      <Fotter />
    </>
  );
};

export default Products;
