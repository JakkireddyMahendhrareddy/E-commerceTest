import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  API_ROUTES,
  loginSuccessToastNotificationSettings,
} from "../../utils/apiRoutes";

const AddProductModal = ({
  isOpen,
  onClose,
  onProductAdded,
  setAllProducts,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    category: "",
    price: "",
    rating: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadMethod, setUploadMethod] = useState("url"); // "url" or "file"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, GIF, WebP)");
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageFile = async () => {
    if (!imageFile) return null;

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(API_ROUTES.IMAGE_UPLOAD.SINGLE_IMAGE, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      throw error;
    }
  };

  const AddProductDetails = async (newProduct) => {
    console.log("Adding product:", newProduct);
    setIsLoading(true);

    try {
      if (!newProduct?.name || !newProduct?.price) {
        toast.error("Product name and price are required");
        setIsLoading(false);
        return false;
      }

      // Upload image if file is selected
      let imageUrl = newProduct.image;
      if (uploadMethod === "file" && imageFile) {
        imageUrl = await uploadImageFile();
      }

      const productWithImage = {
        ...newProduct,
        image: imageUrl,
      };

      const response = await fetch(API_ROUTES.PRODUCT.CREATE_PRODUCT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productWithImage),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      toast.success(
        data.message || "Product added successfully!",
        loginSuccessToastNotificationSettings
      );

      setAllProducts((prev) => [data.product, ...prev]);

      if (onProductAdded) {
        onProductAdded(data.product);
      }

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error adding product:", error);
      setIsLoading(false);

      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        toast.error(
          "Network error: Please check your internet connection and try again"
        );
      } else if (error.message.includes("HTTP error")) {
        toast.error(`Server error: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred while adding the product");
      }

      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    // Validate image
    if (uploadMethod === "url" && !formData.image) {
      toast.error("Please provide an image URL or upload an image file");
      return;
    }
    if (uploadMethod === "file" && !imageFile) {
      toast.error("Please select an image file or provide an image URL");
      return;
    }

    const { name, image, description, category, price, rating } = formData;
    const newProduct = {
      name,
      image: uploadMethod === "url" ? image : "", // Will be replaced with uploaded URL
      productDetails: description,
      category,
      price: Number(price),
      rating: Number(rating),
    };

    const success = await AddProductDetails(newProduct);

    if (success) {
      // Reset form only on success
      setFormData({
        name: "",
        image: "",
        description: "",
        category: "",
        price: "",
        rating: 0,
      });
      setImageFile(null);
      setImagePreview("");
      setUploadMethod("url");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Product
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl font-bold disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name *
            </label>
            <input
              name="name"
              id="productName"
              placeholder="Enter product name"
              onChange={handleChange}
              value={formData.name}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
              required
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image *
            </label>

            {/* Upload Method Toggle */}
            <div className="flex gap-4 mb-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="uploadMethod"
                  value="file"
                  checked={uploadMethod === "file"}
                  onChange={(e) => setUploadMethod(e.target.value)}
                  className="mr-2"
                />
                Upload File
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="uploadMethod"
                  value="url"
                  checked={uploadMethod === "url"}
                  onChange={(e) => setUploadMethod(e.target.value)}
                  className="mr-2"
                />
                Image URL
              </label>
            </div>

            {uploadMethod !== "url" ? (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
                  required
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ) : (
              <input
                name="image"
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                onChange={handleChange}
                value={formData.image}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
                type="url"
                required
              />
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Details
            </label>
            <textarea
              name="description"
              placeholder="Describe your product..."
              onChange={handleChange}
              id="description"
              value={formData.description}
              disabled={isLoading}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none disabled:bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category *
              </label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-100"
                required
              >
                <option value="">Select</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="appliance">Appliance</option>
                <option value="grocery">Grocery</option>
                <option value="toys">Toys</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price (Rs) *
              </label>
              <input
                name="price"
                type="number"
                id="price"
                value={formData.price}
                placeholder="1499"
                onChange={handleChange}
                disabled={isLoading}
                min="0"
                step="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rating (1-5)
            </label>
            <input
              name="rating"
              id="rating"
              value={formData.rating}
              type="number"
              placeholder="4.5"
              onChange={handleChange}
              disabled={isLoading}
              min="1"
              max="5"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {uploadMethod === "file" && imageFile
                    ? "Uploading..."
                    : "Adding..."}
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
