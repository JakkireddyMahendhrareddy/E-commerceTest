// import React, { useEffect, useState } from "react";
// import { MdCancel } from "react-icons/md";
// import Cookies from "js-cookie";

// import {
//   API_ROUTES,
//   errorViewToastNotificationSettings,
// } from "../../utils/apiRoutes";
// import { toast } from "react-toastify";

// const CartItems = () => {
//   const [cart, setCart] = useState([]);
//   const userId = localStorage.getItem("userId"); // or from auth context

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const token = Cookies.get("jwtToken"); // if your route is protected
//         const response = await fetch(`${API_ROUTES.CART.GET_CARTS}/${userId}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // optional if auth is required
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch cart");
//         }

//         const data = await response.json();
//         setCart(data.cart.products || []);
//         console.log(data.cart.products);
//       } catch (err) {
//         console.error("Error fetching cart:", err);
//         toast.error("Something went Wrong", errorViewToastNotificationSettings);
//       }
//     };

//     if (userId) {
//       fetchCart();
//     }
//   }, [userId]);

//   const handleDelete = () => {
//     console.log("delete");
//   };

//   return (
//     <div className="flex flex-col justify-start items-center px-2 sm:px-4 md:px-6 lg:px-10 min-h-screen mt-4 md:mt-6 w-full">
//       <div className="flex flex-col justify-center items-center w-full max-w-7xl gap-3 md:gap-5">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 sm:gap-0">
//           <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center sm:text-left">
//             My Cart
//           </h1>
//           <button
//             onClick={handleDelete}
//             className="bg-blue-500 hover:bg-red-600 text-xs sm:text-sm md:text-base font-semibold text-white px-3 sm:px-4 md:px-6 py-2 md:py-2.5 rounded-md cursor-pointer transition-colors duration-200 w-full sm:w-auto"
//           >
//             Remove All
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="w-full  space-y-3 md:space-y-4">
//           {cart.map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-5 w-full bg-white rounded-lg md:rounded-xl px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4 shadow-md hover:shadow-lg transition-shadow duration-200"
//             >
//               {/* Image and Product Details */}
//               <div className="flex flex-row items-center gap-3 md:gap-4 w-full md:w-2/5">
//                 <img
//                   src={item?.image}
//                   alt="product"
//                   className="rounded-md object-cover h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 flex-shrink-0"
//                 />
//                 <div className="flex flex-col min-w-0 flex-1">
//                   <h5 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 truncate">
//                     {item?.name}
//                   </h5>
//                   <p className="text-xs sm:text-sm md:text-base text-gray-600 truncate">
//                     {item?.brand}
//                   </p>
//                 </div>
//               </div>

//               {/* Quantity Controls and Price Section */}
//               <div className="flex flex-row justify-between items-center w-full md:w-3/5 gap-3 md:gap-5">
//                 {/* Quantity Controls */}
//                 <div className="flex flex-row items-center gap-2 md:gap-3">
//                   <button
//                     onClick={() => decreaseValue(index)}
//                     className="inline-flex items-center justify-center border border-gray-300 px-2.5 sm:px-3 md:px-3.5 py-1.5 md:py-2 bg-white text-black text-sm md:text-base font-medium shadow-sm cursor-pointer rounded hover:bg-gray-50 hover:border-blue-400 transition-all duration-200 min-w-[32px] md:min-w-[36px]"
//                   >
//                     -
//                   </button>
//                   <span className="text-sm sm:text-base md:text-lg font-semibold min-w-[20px] text-center">
//                     {quantities[index]}
//                   </span>
//                   <button
//                     onClick={() => increaseValue(index)}
//                     className="inline-flex items-center justify-center border border-gray-300 px-2.5 sm:px-3 md:px-3.5 py-1.5 md:py-2 bg-white text-black text-sm md:text-base font-medium shadow-sm cursor-pointer rounded hover:bg-gray-50 hover:border-blue-400 transition-all duration-200 min-w-[32px] md:min-w-[36px]"
//                   >
//                     +
//                   </button>
//                 </div>

//                 {/* Price and Remove Button */}
//                 <div className="flex flex-row items-center gap-2 md:gap-4">
//                   <h5 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-blue-600 whitespace-nowrap">
//                     ₹{item?.price * quantities[index]}/-
//                   </h5>
//                   <MdCancel
//                     className="w-5 h-5 md:w-6 md:h-6 cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200 flex-shrink-0"
//                     onClick={() => {
//                       // Add individual item remove functionality if needed
//                       console.log("Remove item:", index);
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="flex flex-col mb-10 bg-white shadow-lg justify-end items-stretch ml-auto p-4 md:p-6 rounded-xl w-full sm:max-w-md md:max-w-lg lg:max-w-xl mt-4">
//           <div className="flex flex-col space-y-3 md:space-y-4">
//             <div className="text-center md:text-right">
//               <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl text-black font-semibold">
//                 <span className="text-gray-600">Order Total:</span> ₹
//                 {cart.reduce(
//                   (total, item, idx) => total + item.price * quantities[idx],
//                   0
//                 )}
//                 /-
//               </h1>
//               <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
//                 {cart.length} item{cart.length !== 1 ? "s" : ""} in Cart
//               </p>
//             </div>
//             <button className="w-full py-2.5 md:py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base md:text-lg font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
//               Checkout
//             </button>
//           </div>
//         </div>

//         {/* Empty Cart State */}
//         {cart.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-12 md:py-16">
//             <div className="text-center">
//               <h2 className="text-lg md:text-xl font-semibold text-gray-600 mb-2">
//                 Your cart is empty
//               </h2>
//               <p className="text-sm md:text-base text-gray-500">
//                 Add some products to get started
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartItems;

import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import Cookies from "js-cookie";

import {
  API_ROUTES,
  errorViewToastNotificationSettings,
} from "../../utils/apiRoutes";
import { toast } from "react-toastify";
import Fotter from "../../components/Fotter";
import Navbar from "../../components/Navbar";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId"); // Consider using auth context instead

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setLoading(false);
        setError("User not authenticated");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const token = Cookies.get("jwtToken");
        const response = await fetch(`${API_ROUTES.CART.GET_CARTS}/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.logd(data, "+++++++++++++++");

        // Handle different possible response structures
        let cartItems = [];
        if (data.cart?.products) {
          cartItems = data.cart.products;
        } else if (data.products) {
          cartItems = data.products;
        } else if (data.items) {
          cartItems = data.items;
        } else if (Array.isArray(data)) {
          cartItems = data;
        }

        setCart(cartItems);
        // Initialize quantities based on cart items
        setQuantities(cartItems.map((item) => item.quantity || 1));

        console.log("Cart data:", cartItems);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError(err.message);
        toast.error(
          "Failed to load cart items",
          errorViewToastNotificationSettings
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const increaseValue = async (index) => {
    try {
      const newQuantities = [...quantities];
      newQuantities[index] += 1;
      setQuantities(newQuantities);

      // Optional: Update quantity on server
      await updateCartItemQuantity(cart[index].id, newQuantities[index]);
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error(
        "Failed to update quantity",
        errorViewToastNotificationSettings
      );
    }
  };

  const decreaseValue = async (index) => {
    if (quantities[index] > 1) {
      try {
        const newQuantities = [...quantities];
        newQuantities[index] -= 1;
        setQuantities(newQuantities);

        // Optional: Update quantity on server
        await updateCartItemQuantity(cart[index].id, newQuantities[index]);
      } catch (err) {
        console.error("Error updating quantity:", err);
        toast.error(
          "Failed to update quantity",
          errorViewToastNotificationSettings
        );
      }
    }
  };

  const updateCartItemQuantity = async (itemId, quantity) => {
    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_ROUTES.CART.UPDATE_QUANTITY}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          userId,
          itemId,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity on server");
      }
    } catch (err) {
      console.error("Error updating cart item quantity:", err);
      // You might want to revert the local state here
    }
  };

  const removeCartItem = async (index) => {
    try {
      const token = Cookies.get("jwtToken");
      const itemId = cart[index].id;

      const response = await fetch(`${API_ROUTES.CART.REMOVE_ITEM}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          userId,
          itemId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      // Update local state
      const newCart = cart.filter((_, i) => i !== index);
      const newQuantities = quantities.filter((_, i) => i !== index);
      setCart(newCart);
      setQuantities(newQuantities);

      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Failed to remove item", errorViewToastNotificationSettings);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_ROUTES.CART.CLEAR_CART}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      setCart([]);
      setQuantities([]);
      toast.success("Cart cleared successfully");
    } catch (err) {
      console.error("Error clearing cart:", err);
      toast.error("Failed to clear cart", errorViewToastNotificationSettings);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading cart...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-start items-center px-2 sm:px-4 md:px-6 lg:px-10 min-h-screen mt-4 md:mt-6 w-full">
        <div className="flex flex-col justify-center items-center w-full max-w-7xl gap-3 md:gap-5">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 sm:gap-0">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center sm:text-left">
              My Cart
            </h1>
            {cart.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="bg-red-500 hover:bg-red-600 text-xs sm:text-sm md:text-base font-semibold text-white px-3 sm:px-4 md:px-6 py-2 md:py-2.5 rounded-md cursor-pointer transition-colors duration-200 w-full sm:w-auto"
              >
                Remove All
              </button>
            )}
          </div>

          {/* Cart Items */}
          {cart.length > 0 ? (
            <>
              <div className="w-full space-y-3 md:space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-5 w-full bg-white rounded-lg md:rounded-xl px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4 shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    {/* Image and Product Details */}
                    <div className="flex flex-row items-center gap-3 md:gap-4 w-full md:w-2/5">
                      <img
                        src={item?.image || "/placeholder-image.jpg"}
                        alt={item?.name || "Product"}
                        className="rounded-md object-cover h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 flex-shrink-0"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <h5 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 truncate">
                          {item?.name || "Product Name"}
                        </h5>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 truncate">
                          {item?.brand || "Brand Name"}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls and Price Section */}
                    <div className="flex flex-row justify-between items-center w-full md:w-3/5 gap-3 md:gap-5">
                      {/* Quantity Controls */}
                      <div className="flex flex-row items-center gap-2 md:gap-3">
                        <button
                          onClick={() => decreaseValue(index)}
                          disabled={quantities[index] <= 1}
                          className="inline-flex items-center justify-center border border-gray-300 px-2.5 sm:px-3 md:px-3.5 py-1.5 md:py-2 bg-white text-black text-sm md:text-base font-medium shadow-sm cursor-pointer rounded hover:bg-gray-50 hover:border-blue-400 transition-all duration-200 min-w-[32px] md:min-w-[36px] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span className="text-sm sm:text-base md:text-lg font-semibold min-w-[20px] text-center">
                          {quantities[index] || 1}
                        </span>
                        <button
                          onClick={() => increaseValue(index)}
                          className="inline-flex items-center justify-center border border-gray-300 px-2.5 sm:px-3 md:px-3.5 py-1.5 md:py-2 bg-white text-black text-sm md:text-base font-medium shadow-sm cursor-pointer rounded hover:bg-gray-50 hover:border-blue-400 transition-all duration-200 min-w-[32px] md:min-w-[36px]"
                        >
                          +
                        </button>
                      </div>

                      {/* Price and Remove Button */}
                      <div className="flex flex-row items-center gap-2 md:gap-4">
                        <h5 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-blue-600 whitespace-nowrap">
                          ₹
                          {(
                            (item?.price || 0) * (quantities[index] || 1)
                          ).toFixed(2)}
                          /-
                        </h5>
                        <MdCancel
                          className="w-5 h-5 md:w-6 md:h-6 cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200 flex-shrink-0"
                          onClick={() => removeCartItem(index)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="flex flex-col mb-10 bg-white shadow-lg justify-end items-stretch ml-auto p-4 md:p-6 rounded-xl w-full sm:max-w-md md:max-w-lg lg:max-w-xl mt-4">
                <div className="flex flex-col space-y-3 md:space-y-4">
                  <div className="text-center md:text-right">
                    <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl text-black font-semibold">
                      <span className="text-gray-600">Order Total:</span> ₹
                      {cart
                        .reduce(
                          (total, item, idx) =>
                            total + (item.price || 0) * (quantities[idx] || 1),
                          0
                        )
                        .toFixed(2)}
                      /-
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                      {cart.length} item{cart.length !== 1 ? "s" : ""} in Cart
                    </p>
                  </div>
                  <button className="w-full py-2.5 md:py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base md:text-lg font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                    Checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Empty Cart State */
            <div className="flex flex-col items-center justify-center py-12 md:py-16">
              <div className="text-center">
                <h2 className="text-lg md:text-xl font-semibold text-gray-600 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-sm md:text-base text-gray-500">
                  Add some products to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Fotter />
    </>
  );
};

export default Cart;
