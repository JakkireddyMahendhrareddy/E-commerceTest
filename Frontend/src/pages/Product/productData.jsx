// import React, { useEffect, useState } from "react";
// import { FcGenericSortingAsc } from "react-icons/fc";
// import { Link } from "react-router-dom";
// // import { eachProduct } from "./prodctDummyData";
// import { FaStar } from "react-icons/fa6";
// import AddProductModal from "./addProductModal";
// import { FaEdit, FaTrash } from "react-icons/fa";

// import {
//   API_ROUTES,
//   errorViewToastNotificationSettings,
//   loginSuccessToastNotificationSettings,
//   logoutToastNotificationSettings,
//   toastNotificationSettings,
// } from "../../utils/apiRoutes";

// const ProductsData = () => {
//   const [sortValue, setSortValue] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [allProducts, setAllProducts] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(API_ROUTES.PRODUCT.GET_PRODUCTS);
//         const data = await response.json();
//         console.log("API Response Data:", data.products);

//         // Fix: Handle different API response formats
//         if (data.products) {
//           setAllProducts(data.products);
//         } else if (Array.isArray(data)) {
//           setAllProducts(data);
//         } else {
//           setAllProducts([]);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setAllProducts([]);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleChange = (e) => {
//     setSortValue(e.target.value);
//     // onSortChange(e.target.value);
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       {/* Header Section - Made Responsive */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-normal rounded-xl">
//           All Products
//         </h1>
//         <div className="flex flex-col">
//           <button
//             type="button"
//             onClick={openModal}
//             className="bg-blue-500 hover:bg-red-500 transition-all ease-in-out transform active:-translate-y cursor-pointer text-white px-3 py-2 font-bold text-xl rounded-md"
//           >
//             Add Product
//           </button>
//         </div>
//         {/* <div className="flex flex-row items-center space-x-2 sm:space-x-4 bg-transparent rounded-xl w-full sm:w-auto">
//           <FcGenericSortingAsc className="w-5 h-5 sm:w-6 sm:h-6" />
//           <h1 className="text-base sm:text-lg font-semibold text-gray-800">
//             Sort by
//           </h1>
//           <select
//             value={sortValue}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-lg px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
//           >
//             <option value="high">Price (High to Low)</option>
//             <option value="low">Price (Low to High)</option>
//           </select>
//         </div> */}
//       </div>

//       {/* Products Grid - Made Responsive */}
//       <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-4 px-2 md:px-0">
//         {allProducts
//           ?.filter((each) => each && each._id)
//           .map((each, index) => (
//             <li className="list-none" key={each._id}>
//               <div className="w-full max-w-xs mx-auto rounded-2xl mb-3 overflow-hidden shadow-lg bg-white flex flex-col h-full transition-transform duration-200 hover:scale-105 relative">
//                 <div className="relative">
//                   <img
//                     className="w-full h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 object-cover"
//                     src={each.image}
//                     alt={each.name}
//                   />
//                   {/* Category Badge */}
//                   <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium uppercase px-3 py-1 rounded shadow-md">
//                     {each.category}
//                   </span>
//                 </div>

//                 <div className="p-2 xs:p-3 sm:p-4 flex flex-col flex-1 justify-between">
//                   <div className="w-full flex justify-between items-center">
//                     {" "}
//                     <h5 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold mb-2 line-clamp-1">
//                       {each.name}
//                     </h5>
//                     <Link
//                       to={`/products/${each.id}`}
//                       state={{ product: each }}
//                       className="inline-block px-3 py-1 text-sm sm:text-base font-semibold text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-300"
//                     >
//                       View Details
//                     </Link>
//                   </div>

//                   <p className="text-blue-500 text-lg sm:text-sm mb-1 tracking-wid leading-6 line-clamp-2">
//                     {each.productDetails}
//                   </p>

//                   <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 xs:gap-0 w-full">
//                     {/* Price & Rating */}
//                     <h5 className="text-sm xs:text-base sm:text-lg font-semibold mb-0 xs:mb-2">
//                       Rs:{each.price}/-
//                     </h5>
//                     <div className="flex flex-row items-center w-full justify-between">
//                       {" "}
//                       <button className="inline-flex items-center gap-1 px-2 xs:px-3 sm:px-5 py-1 sm:py-2 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-600 transition">
//                         {each.rating}
//                         <FaStar />
//                       </button>
//                       {/* Edit & Delete Icons */}
//                       <div className="flex items-center gap-2">
//                         <FaEdit
//                           className="text-green-500 hover:text-green-700 cursor-pointer"
//                           onClick={() => handleEdit(each._id)}
//                         />
//                         <FaTrash
//                           className="text-red-500 hover:text-red-700 cursor-pointer"
//                           onClick={() => handleDelete(each._id)}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))}
//       </div>
//       <AddProductModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         setAllProducts={setAllProducts}
//       />
//     </div>
//   );
// };

// export default ProductsData;

import React, { useEffect, useState } from "react";
import { FcGenericSortingAsc } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import AddProductModal from "./addProductModal";
import { FaEdit, FaTrash } from "react-icons/fa";

import {
  API_ROUTES,
  errorViewToastNotificationSettings,
  loginSuccessToastNotificationSettings,
  logoutToastNotificationSettings,
  toastNotificationSettings,
} from "../../utils/apiRoutes";

const ProductsData = () => {
  const [sortValue, setSortValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    setSortValue(e.target.value);
  };

  const handleEdit = (productId) => {
    console.log("Edit product:", productId);
  };

  const handleDelete = (productId) => {
    console.log("Delete product:", productId);
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
          onClick={openModal}
          className="bg-blue-500 hover:bg-red-500 transition-all ease-in-out transform active:-translate-y-1 cursor-pointer text-white px-4 py-2 font-bold text-lg sm:text-xl rounded-md w-full sm:w-auto"
        >
          Add Product
        </button>
      </div>

      {/* Products Grid - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
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
                    <Link
                      to={`/products/${each._id}`}
                      state={{ product: each }}
                      className="self-start inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                    >
                      View Details
                    </Link>
                  </div>

                  {/* Product Description */}
                  <p className="text-blue-500 text-xs sm:text-sm mb-3 leading-relaxed line-clamp-2 flex-grow">
                    {each.productDetails}
                  </p>

                  {/* Bottom Section */}
                  <div className="mt-auto">
                    {/* Price */}
                    <h5 className="text-sm sm:text-base md:text-lg font-semibold mb-2">
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
                          onClick={() => handleEdit(each._id)}
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

      <AddProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        setAllProducts={setAllProducts}
      />
    </div>
  );
};

export default ProductsData;
