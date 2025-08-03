import React, { useContext } from "react";
import { FaStar } from "react-icons/fa6";
import { Link, useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Fotter from "../../components/Fotter";
import { eachProduct } from "./prodctDummyData";
import ProductValue from "./productValue";
import SimilarProducts from "./similarProducts";

import { CartContext } from "../Cart/cartContext";

const Product = () => {
  const id = useParams();
  const { addToCart } = React.useContext(CartContext);

  const location = useLocation();

  const [product, setProduct] = React.useState(location.state?.product || null);

  React.useEffect(() => {
    if (!product) {
      const found = eachProduct.find((p) => p.id === id);
      setProduct(found);
    }
  }, [id, product]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center mb-5 items-start px-10 mt-5 w-full">
        <div className="flex flex-col justify-center items-start px-10 mt-5 w-full gap-10">
          <h5 className="text-3xl font-bold">Product Details</h5>
          <div className="flex flex-row justify-center items-start  gap-10">
            <div className="w-[30vw] h-[60vh] ">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full rounded-md"
              />
            </div>
            <div className="space-y-5 w-[50vw] h-[70vh]">
              <h5 className="text-3xl font-semibold mb-2">{product.name} </h5>
              <h5 className="text-lg font-semibold mb-2">{product.price}/-</h5>
              <div className="flex flex-row justify-start items-center gap-3">
                <button className="inline-flex items-center gap-1 px-5 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition">
                  {product.rating}
                  <FaStar />
                </button>
                <h5 className="text-lg font-semibold  ">
                  {product.reviews}
                  {"   "}
                  <span className="font-normal text-red-500"> Reviews</span>
                </h5>
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-6 tracking-wide">
                {product.extraInfo}
              </p>
              <h5 className="text-lg font-small">
                <span className="text-xl font-semibold">Avalibile: </span>{" "}
                {product.stock}
              </h5>
              <h5 className="text-lg font-small">
                <span className="text-xl font-semibold">Brand: </span>{" "}
                {product.brand}
              </h5>
              <h5 className="text-lg font-small">
                <span className="text-xl font-semibold">Category: </span>{" "}
                {product.category}
              </h5>
              <hr className="bg-gray-100 border-1 mb-5 mt-3" />
              <ProductValue />
              <Link to="/cart">
                <button
                  onClick={handleAddToCart}
                  className="inline-flex cursor-pointer items-center gap-1 px-5 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
                >
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
        <SimilarProducts />
      </div>
      <Fotter />
    </>
  );
};

export default Product;
