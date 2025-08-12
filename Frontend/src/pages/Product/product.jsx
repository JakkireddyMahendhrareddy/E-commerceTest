import React, { useContext } from "react";
import { FaStar } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Fotter from "../../components/Fotter";
// import { eachProduct } from "./prodctDummyData";
import ProductValue from "./productValue";
// import SimilarProducts from "./similarProducts";
import { CartContext } from "../Cart/cartContext";

const Product = ({ singleProduct }) => {
  // const id = useParams();
  const { addToCart } = React.useContext(CartContext);

  const location = useLocation();

  // const [product, setProduct] = React.useState(location.state?.product || null);

  // React.useEffect(() => {
  //   if (!product) {
  //     const found = eachProduct.find((p) => p.id === id);
  //     setProduct(found);
  //   }
  // }, [id, product]);

  const handleAddToCart = () => {
    addToCart(singleProduct);
  };

  return (
    <>
      <Navbar />

      {/* Main Container - Responsive padding */}
      <div className="flex flex-col justify-center mb-5 items-start px-4 sm:px-6 md:px-8 lg:px-10 mt-5 w-full">
        {/* Product Details Container - Responsive padding and gap */}
        <div className="flex flex-col justify-center items-start px-2 sm:px-4 md:px-6 lg:px-10 mt-5 w-full gap-6 sm:gap-8 md:gap-10">
          {/* Page Title - Responsive text size */}
          <h5 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Product Details
          </h5>

          {/* Product Content - Responsive layout */}
          <div className="flex flex-col lg:flex-row justify-center items-start gap-6 sm:gap-8 md:gap-10 w-full">
            {/* Product Image - Responsive dimensions */}
            <div className="w-full lg:w-[30vw] h-64 sm:h-80 md:h-96 lg:h-[60vh] flex-shrink-0">
              <img
                src={singleProduct.image}
                alt={singleProduct.name}
                className="w-full h-full rounded-md object-cover"
              />
            </div>

            {/* Product Details - Responsive width and spacing */}
            <div className="space-y-3 sm:space-y-4 md:space-y-5 w-full lg:w-[50vw] lg:h-[70vh]">
              {/* Product Name - Responsive text size */}
              <h5 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                {singleProduct.name}
              </h5>

              {/* Product Price - Responsive text size */}
              <h5 className="text-base sm:text-lg font-semibold mb-2">
                Rs: {singleProduct.price}/-
              </h5>

              {/* Rating and Reviews - Responsive layout */}
              <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 sm:gap-3">
                <button className="inline-flex items-center gap-1 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-600 transition">
                  {singleProduct.rating}
                  <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <h5 className="text-base sm:text-lg font-semibold">
                  {singleProduct.reviews}
                  {"   "}
                  <span className="font-normal text-red-500">Reviews</span>
                </h5>
              </div>

              {/* Product Description - Responsive text size */}
              <p className="text-gray-700 text-xs sm:text-sm mb-4 leading-5 sm:leading-6 tracking-wide">
                {singleProduct.extraInfo}
              </p>

              {/* Product Details - Responsive text sizes */}
              <h5 className="text-sm sm:text-base md:text-lg font-small">
                <span className="text-base sm:text-lg md:text-xl font-semibold">
                  Available:{" "}
                </span>
                {singleProduct.stock}
              </h5>

              <h5 className="text-sm sm:text-base md:text-lg font-small">
                <span className="text-base sm:text-lg md:text-xl font-semibold">
                  Brand:{" "}
                </span>
                {singleProduct.brand}
              </h5>

              <h5 className="text-sm sm:text-base md:text-lg font-small">
                <span className="text-base sm:text-lg md:text-xl font-semibold">
                  Category:{" "}
                </span>
                {singleProduct.category}
              </h5>

              {/* Divider - Responsive margin */}
              <hr className="bg-gray-100 border-1 mb-3 sm:mb-4 md:mb-5 mt-2 sm:mt-3" />

              {/* Product Value Component */}
              <div className="w-full">
                <ProductValue />
              </div>

              {/* Add to Cart Button - Responsive sizing */}
              <Link to="/cart">
                <button
                  onClick={handleAddToCart}
                  className="inline-flex cursor-pointer items-center gap-1 px-4 sm:px-5 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition w-full sm:w-auto justify-center sm:justify-start"
                >
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {/* <div className="w-full mt-6 sm:mt-8 md:mt-10">
          <SimilarProducts />
        </div> */}
      </div>

      <Fotter />
    </>
  );
};

export default Product;
