import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Fotter from "../../components/Fotter";
import {
  API_ROUTES,
  errorViewToastNotificationSettings,
} from "../../utils/apiRoutes";
import { toast } from "react-toastify";
import SimilarProducts from "./similarProducts";

const Product = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_ROUTES.PRODUCT.GET_PRODUCT}/${id}`);
        const data = await res.json();
        setSingleProduct(data.product);

        // After setting the single product, fetch similar products by category
        if (data.product?.category) {
          fetchSimilarProducts(data.product.category);
        }
      } catch (error) {
        console.error("Error showing product:", error);
        toast.error(
          error?.message || "Something went wrong",
          errorViewToastNotificationSettings
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarProducts = async (category) => {
      try {
        const res = await fetch(
          `${API_ROUTES.PRODUCT.CATEGORY_PRODUCTS}/${category}`
        );
        const data = await res.json();
        setSimilar(data.products || []); // assuming your API returns { products: [...] }
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-10">Loading product...</p>
        <Fotter />
      </>
    );
  }

  if (!singleProduct) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-10">Product not found.</p>
        <Fotter />
      </>
    );
  }

  const handleAddToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId") || null; // or get from context/auth state
      const quantity = 1; // You can make this dynamic

      console.log(userId, productId, quantity, "0000000000");

      if (!userId) {
        toast.error(
          "Please login to add items to cart",
          errorViewToastNotificationSettings
        );
        return;
      }

      const res = await fetch(`${API_ROUTES.CART.ADD_CART}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Added to cart successfully");
      } else {
        toast.error(data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong", errorViewToastNotificationSettings);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col  justify-center  items-start px-4 sm:px-6 md:px-8 lg:px-10 mt-5 w-full">
        <div className="flex flex-col justify-center items-start px-2 sm:px-4 md:px-6 lg:px-10 mt-5 w-full gap-6">
          <h5 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Product Details
          </h5>

          <div className="flex flex-col lg:flex-row gap-6 w-full">
            <div className="w-full lg:w-[30vw] h-64 sm:h-80 md:h-96 lg:h-[60vh] flex-shrink-0">
              <img
                src={singleProduct.image}
                alt={singleProduct.name}
                className="w-full h-full rounded-md object-cover"
              />
            </div>

            <div className="space-y-3 w-full lg:w-[50vw]">
              <h5 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                {singleProduct.name}
              </h5>
              <p className="text-gray-700 text-xs sm:text-sm mb-4 leading-5">
                {singleProduct.productDetails}
              </p>
              <h5 className="text-base sm:text-lg font-semibold mb-2">
                Rs: {singleProduct.price}/-
              </h5>

              <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-600 transition">
                {singleProduct.rating}
                <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <h5 className="text-sm sm:text-base md:text-lg">
                <span className="font-semibold">
                  Reviews:{" "}
                  <span className="font-normal text-red-500">100 </span>
                </span>
                {singleProduct.stock}
              </h5>

              <h5 className="text-sm sm:text-base md:text-lg">
                <span className="font-semibold">
                  Available:{" "}
                  <span className="font-normal text-red-500">10 </span>
                </span>
                {singleProduct.stock}
              </h5>
              <h5 className="text-sm sm:text-base md:text-lg">
                <span className="font-semibold">
                  Brand:{" "}
                  <span className="font-normal text-red-500">All Brands </span>
                </span>
                {singleProduct.brand}
              </h5>
              <h5 className="text-sm sm:text-base font-semibold md:text-lg">
                Category:{" "}
                <span className="font-normal text-red-500">
                  {" "}
                  {singleProduct.category}
                </span>
              </h5>

              <hr className="bg-gray-100 border-1 my-3 mt-10 mb-5" />

              <button
                onClick={() => handleAddToCart(singleProduct._id)}
                className="inline-flex cursor-pointer mt-3 items-center gap-1 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition w-full sm:w-auto"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <SimilarProducts similar={similar} />
      </div>

      <Fotter />
    </div>
  );
};

export default Product;
