import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import AddProductModal from "./addProductModal";
import EditProductModal from "./editProductModal";
import {
  FaEdit,
  FaTrash,
  FaArrowRight,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import {
  API_ROUTES,
  errorViewToastNotificationSettings,
  loginSuccessToastNotificationSettings,
} from "../../utils/apiRoutes";
import { toast } from "react-toastify";

const ProductsData = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // Store original products
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Debounced search function
  const fetchProducts = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await fetch(API_ROUTES.PRODUCT.GET_PRODUCTS);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);

      let products = [];
      if (data && data.products && Array.isArray(data.products)) {
        products = data.products;
      } else if (Array.isArray(data)) {
        products = data;
      } else {
        console.warn("Unexpected API response format:", data);
        products = [];
      }

      // Filter out invalid products
      const validProducts = products.filter(
        (product) => product && product._id && product.name && product.category
      );

      setAllProducts(validProducts);
      setOriginalProducts(validProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasError(true);
      toast.error(
        "Failed to load products. Please try again later.",
        errorViewToastNotificationSettings
      );
      setAllProducts([]);
      setOriginalProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  const performSearch = useCallback(
    async (term) => {
      if (!term.trim()) {
        // If search term is empty, show all original products
        setAllProducts(originalProducts);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `${API_ROUTES.PRODUCT.SEARCH_PRODUCTS}/${encodeURIComponent(term)}`
        );

        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`);
        }

        const data = await response.json();
        console.log("Search API Response Data:", data);

        if (data && data.products && Array.isArray(data.products)) {
          const validProducts = data.products.filter((p) => p && p._id);
          setAllProducts(validProducts);
        } else {
          setAllProducts([]);
        }
      } catch (error) {
        console.error("Error searching for products:", error.message);
        toast.warning(
          "Search failed. Showing filtered results from available products.",
          errorViewToastNotificationSettings
        );
        // On error, fall back to client-side filtering
        const filteredProducts = originalProducts.filter(
          (product) =>
            product &&
            product.name &&
            product.category &&
            product.productDetails &&
            (product.name.toLowerCase().includes(term.toLowerCase()) ||
              product.category.toLowerCase().includes(term.toLowerCase()) ||
              product.productDetails.toLowerCase().includes(term.toLowerCase()))
        );
        setAllProducts(filteredProducts);
      } finally {
        setIsSearching(false);
      }
    },
    [originalProducts]
  );

  // Create debounced version of search
  const debouncedSearch = useCallback(debounce(performSearch, 300), [
    performSearch,
  ]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Handle search button click (immediate search)
  const handleSearchClick = () => {
    performSearch(searchTerm);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    setAllProducts(originalProducts);
    setIsSearching(false);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      performSearch(searchTerm);
    }
  };

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
    // Update both allProducts and originalProducts
    const updateProducts = (prev) =>
      prev.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );

    setAllProducts(updateProducts);
    setOriginalProducts(updateProducts);
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

        // Remove from both allProducts and originalProducts
        const filterProducts = (prev) =>
          prev.filter((product) => product._id !== productId);
        setAllProducts(filterProducts);
        setOriginalProducts(filterProducts);
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

  const handleProductAdd = (newProduct) => {
    // Add to both allProducts and originalProducts
    setAllProducts((prev) => [newProduct, ...prev]);
    setOriginalProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <div className="flex flex-col gap-5 px-2 sm:px-4 lg:px-6">
      <div className="flex flex-col bg-gray-200 shadow p-3 sm:flex-row justify-between items-center sm:items-center gap-4 mb-10 sm:gap-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-normal">
          All Products
        </h1>
        <div className="flex items-center w-full sm:w-80 md:w-96 border border-black hover:border-blue-700 rounded-lg overflow-hidden shadow">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="px-2 py-2 sm:py-3 hover:bg-gray-100 cursor-pointer"
              title="Clear search"
            >
              <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </button>
          )}
          <button
            onClick={handleSearchClick}
            className="px-3 sm:px-4 py-2 sm:py-3 hover:border-blue-700 cursor-pointer"
            disabled={isSearching}
          >
            <FaSearch
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                isSearching ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="self-start inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold tracking-widest text-white cursor-pointer bg-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-300 border border-blue-200 hover:border-blue-600 hover:shadow-md transform hover:scale-105 hover:shadow-blue-400/50 animate-pulse"
        >
          Add Product
        </button>
      </div>

      {/* Search Status */}
      {/* {searchTerm && (
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
          <span className="text-sm text-blue-700">
            {isSearching
              ? `Searching for "${searchTerm}"...`
              : `Found ${allProducts.length} product(s) for "${searchTerm}"`}
          </span>
          <button
            onClick={handleClearSearch}
            className="text-xs bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md text-blue-700 transition-colors"
          >
            Show All Products
          </button>
        </div>
      )} */}

      {/* Products Grid - Fully Responsive */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      ) : hasError ? (
        <div className="text-center py-20">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Failed to load products
          </h3>
          <p className="text-gray-600 mb-4">
            Something went wrong while fetching products.
          </p>
          <button
            onClick={fetchProducts}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6">
          {allProducts?.map((each, index) => (
            <div key={each._id} className="list-none">
              <div className="w-full rounded-2xl mb-3 overflow-hidden shadow-lg bg-white flex flex-col h-full transition-transform duration-200 hover:scale-105">
                <div className="relative">
                  <Link to={`${each._id}`}>
                    <img
                      className="w-full h-40 sm:h-44 md:h-48 lg:h-52 object-cover"
                      src={each.image}
                      alt={each.name}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Image+Not+Available";
                      }}
                    />
                  </Link>
                  {/* Category Badge */}
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium uppercase px-2 sm:px-3 py-1 rounded shadow-md">
                    {each.category}
                  </span>
                </div>

                <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                  {/* Product Name and View Details */}
                  <div className="flex flex-row justify-between gap-2 mb-3">
                    <h5 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-2">
                      {each.name}
                    </h5>
                    <Link
                      to={`${each._id}`}
                      className="self-start inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-300 border border-blue-200 hover:border-blue-600 hover:shadow-md transform hover:scale-105 hover:shadow-blue-400/50 animate-pulse"
                    >
                      Check
                      <FaArrowRight className="transition-transform text-black duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Product Description */}
                  <p className="text-gray-500 text-xs sm:text-sm mb-3 leading-relaxed line-clamp-2 flex-grow">
                    {each.productDetails}
                  </p>

                  {/* Bottom Section */}
                  <div className="mt-auto">
                    {/* Price */}
                    <h5 className="text-sm sm:text-base md:text-lg font-semibold ">
                      Rs:{each.price}/-
                    </h5>

                    {/* Rating and Actions */}
                    <div className="flex items-center justify-between mt-4">
                      <button className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-600 transition">
                        {each.rating}
                        <FaStar />
                      </button>

                      <div className="flex items-center gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(each)}
                          className="p-2 rounded-md cursor-pointer text-green-600 hover:bg-green-100 transition-colors duration-200"
                          title="Edit"
                        >
                          <FaEdit className="w-5 h-5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(each._id)}
                          className="p-2 rounded-md cursor-pointer text-red-600 hover:bg-red-100 transition-colors duration-200"
                          title="Delete"
                        >
                          <FaTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Products Found */}
      {!isLoading && !hasError && allProducts.length === 0 && !isSearching && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm
              ? `No products found for "${searchTerm}"`
              : "No products available"}
          </p>
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="mt-4 px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Show All Products
            </button>
          )}
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        setAllProducts={handleProductAdd}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        product={selectedProduct}
        onProductUpdate={handleProductUpdate}
      />
      {/* <Product singleProduct={singleProduct} /> */}
    </div>
  );
};

export default ProductsData;
