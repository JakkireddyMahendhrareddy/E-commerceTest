import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import AddProductModal from "./addProductModal";
import EditProductModal from "./editProductModal"; // New component
import { FaEdit, FaTrash } from "react-icons/fa";

import {
  API_ROUTES,
  errorViewToastNotificationSettings,
  loginSuccessToastNotificationSettings,
} from "../../utils/apiRoutes";
import { toast } from "react-toastify";
import Product from "./product";

const ProductsData = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_ROUTES.PRODUCT.GET_PRODUCTS);
        const data = await response.json();
        console.log("API Response Data:", data.products);

        if (data.products) {
          setAllProducts(data.products);
        } else if (Array.isArray(data)) {
          setAllProducts(data);
        } else {
          setAllProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setAllProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  const handleEdit = (product) => {
    openEditModal(product);
  };

  const handleProductUpdate = (updatedProduct) => {
    setAllProducts((prev) =>
      prev.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(
        `${API_ROUTES.PRODUCT.DELETE_PRODUCT}/${productId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, loginSuccessToastNotificationSettings);
        setAllProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
      } else {
        toast.error(
          data?.message || "Failed to delete product",
          errorViewToastNotificationSettings
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(
        error?.message || "Something went wrong",
        errorViewToastNotificationSettings
      );
    }
  };

  const showProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `${API_ROUTES.PRODUCT.GET_PRODUCT}/${productId}`
      );
      const data = await response.json();

      if (response.ok) {
        // Check if product already exists to avoid duplicates
        const productExists = singleProduct.some((p) => p._id === productId);

        if (!productExists) {
          setSingleProduct([...singleProduct, data.product]);
        }
      } else {
        toast.error(
          data?.message || "Failed to fetch product details",
          errorViewToastNotificationSettings
        );
      }
    } catch (error) {
      console.error("Error showing product:", error);
      toast.error(
        error?.message || "Something went wrong",
        errorViewToastNotificationSettings
      );
    }
  };

  return (
    <div className="flex flex-col gap-5 px-2 sm:px-4 lg:px-6">
      {/* Header Section - Responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-normal">
          All Products
        </h1>
        <button
          type="button"
          onClick={openAddModal}
          className="bg-blue-500 hover:bg-red-500 transition-all ease-in-out transform active:-translate-y-1 cursor-pointer text-white px-4 py-2 font-bold text-lg sm:text-xl rounded-md w-full sm:w-auto"
        >
          Add Product
        </button>
      </div>

      {/* Products Grid - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
        {allProducts
          ?.filter((each) => each && each._id)
          .map((each, index) => (
            <div key={each._id} className="list-none">
              <div className="w-full rounded-2xl mb-3 overflow-hidden shadow-lg bg-white flex flex-col h-full transition-transform duration-200 hover:scale-105">
                <div className="relative">
                  <img
                    className="w-full h-40 sm:h-44 md:h-48 lg:h-52 object-cover"
                    src={each.image}
                    alt={each.name}
                  />
                  {/* Category Badge */}
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium uppercase px-2 sm:px-3 py-1 rounded shadow-md">
                    {each.category}
                  </span>
                </div>

                <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                  {/* Product Name and View Details */}
                  <div className="flex flex-col gap-2 mb-3">
                    <h5 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-2">
                      {each.name}
                    </h5>
                    {/* <Link
                      to={`${each._id}`}
                      state={{ product: each }}
                    > */}
                    <button
                      onClick={() => showProductDetails(each._id)}
                      className="self-start inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                    >
                      View Details
                    </button>{" "}
                    {/* </Link> */}
                  </div>

                  {/* Product Description */}
                  <p className="text-blue-500 text-xs sm:text-sm mb-3 leading-relaxed line-clamp-2 flex-grow">
                    {each.productDetails}
                  </p>

                  {/* Bottom Section */}
                  <div className="mt-auto">
                    {/* Price */}
                    <h5 className="text-sm sm:text-base md:text-lg font-semibold ">
                      Rs:{each.price}/-
                    </h5>

                    {/* Rating and Actions */}
                    <div className="flex items-center justify-between">
                      <button className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-600 transition">
                        {each.rating}
                        <FaStar />
                      </button>

                      {/* Edit & Delete Icons */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <FaEdit
                          className="text-green-500 hover:text-green-700 cursor-pointer w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200"
                          onClick={() => handleEdit(each)}
                        />
                        <FaTrash
                          className="text-red-500 hover:text-red-700 cursor-pointer w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200"
                          onClick={() => handleDelete(each._id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        setAllProducts={setAllProducts}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        product={selectedProduct}
        onProductUpdate={handleProductUpdate}
      />
      <Product singleProduct={singleProduct} />
    </div>
  );
};

export default ProductsData;
