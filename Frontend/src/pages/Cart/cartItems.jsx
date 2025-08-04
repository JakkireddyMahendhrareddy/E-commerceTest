import React, { useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import ProductValue from "../Product/productValue";
import { CartContext } from "../Cart/cartContext";

const CartItems = () => {
  const { cart, clearCart } = useContext(CartContext);
  // Track quantity for each cart item by index, load from localStorage if available
  const [quantities, setQuantities] = useState(() => {
    const stored = localStorage.getItem("cart_quantities");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === cart.length)
          return parsed;
      } catch {}
    }
    return cart.map(() => 1);
  });

  // Restore quantities from localStorage if cart changes and lengths match
  React.useEffect(() => {
    const stored = localStorage.getItem("cart_quantities");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === cart.length) {
          setQuantities(parsed);
          return;
        }
      } catch {}
    }
    setQuantities(cart.map(() => 1));
  }, [cart]);

  // Store quantities and order total in localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem("cart_quantities", JSON.stringify(quantities));
    const orderTotal = cart.reduce(
      (total, item, idx) => total + item.price * quantities[idx],
      0
    );
    localStorage.setItem("order_total", orderTotal);
  }, [quantities, cart]);

  const handleDelete = () => {
    clearCart();
  };

  const increaseValue = (idx) => {
    setQuantities((prev) => prev.map((q, i) => (i === idx ? q + 1 : q)));
  };

  const decreaseValue = (idx) => {
    setQuantities((prev) =>
      prev.map((q, i) => (i === idx && q > 1 ? q - 1 : q))
    );
  };

  return (
    <div className="flex flex-col justify-start items-center px-2 sm:px-4 md:px-6 lg:px-10 min-h-screen mt-4 md:mt-6 w-full">
      <div className="flex flex-col justify-center items-center w-full max-w-7xl gap-3 md:gap-5">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 sm:gap-0">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center sm:text-left">
            My Cart
          </h1>
          <button
            onClick={handleDelete}
            className="bg-blue-500 hover:bg-red-600 text-xs sm:text-sm md:text-base font-semibold text-white px-3 sm:px-4 md:px-6 py-2 md:py-2.5 rounded-md cursor-pointer transition-colors duration-200 w-full sm:w-auto"
          >
            Remove All
          </button>
        </div>

        {/* Cart Items */}
        <div className="w-full  space-y-3 md:space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-5 w-full bg-white rounded-lg md:rounded-xl px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              {/* Image and Product Details */}
              <div className="flex flex-row items-center gap-3 md:gap-4 w-full md:w-2/5">
                <img
                  src={item?.image}
                  alt="product"
                  className="rounded-md object-cover h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 flex-shrink-0"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <h5 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 truncate">
                    {item?.name}
                  </h5>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 truncate">
                    {item?.brand}
                  </p>
                </div>
              </div>

              {/* Quantity Controls and Price Section */}
              <div className="flex flex-row justify-between items-center w-full md:w-3/5 gap-3 md:gap-5">
                {/* Quantity Controls */}
                <div className="flex flex-row items-center gap-2 md:gap-3">
                  <button
                    onClick={() => decreaseValue(index)}
                    className="inline-flex items-center justify-center border border-gray-300 px-2.5 sm:px-3 md:px-3.5 py-1.5 md:py-2 bg-white text-black text-sm md:text-base font-medium shadow-sm cursor-pointer rounded hover:bg-gray-50 hover:border-blue-400 transition-all duration-200 min-w-[32px] md:min-w-[36px]"
                  >
                    -
                  </button>
                  <span className="text-sm sm:text-base md:text-lg font-semibold min-w-[20px] text-center">
                    {quantities[index]}
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
                    ₹{item?.price * quantities[index]}/-
                  </h5>
                  <MdCancel
                    className="w-5 h-5 md:w-6 md:h-6 cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200 flex-shrink-0"
                    onClick={() => {
                      // Add individual item remove functionality if needed
                      console.log("Remove item:", index);
                    }}
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
                {cart.reduce(
                  (total, item, idx) => total + item.price * quantities[idx],
                  0
                )}
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

        {/* Empty Cart State */}
        {cart.length === 0 && (
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
  );
};

export default CartItems;
