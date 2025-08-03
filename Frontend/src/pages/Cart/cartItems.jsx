import React, { useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import ProductValue from "../Product/productValue";
import { CartContext } from "../Cart/cartContext";

const CartItems = () => {
  const { cart, clearCart } = useContext(CartContext);
  // Track quantity for each cart item by index
  const [quantities, setQuantities] = useState(cart.map(() => 1));

  // Update quantities if cart changes (e.g., after Remove All)
  React.useEffect(() => {
    setQuantities(cart.map(() => 1));
  }, [cart]);

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
    <div className="flex flex-col justify-start mb-5 items-start px-10 min-h-screen mt-5 w-full">
      <div className="flex flex-col justify-center items-start px-10  w-full gap-5">
        <h1 className="text-3xl font-bold">My Cart</h1>
        <div className="flex flex-row justify-end items-center w-full ">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-lg font-semibold text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Remove All
          </button>
        </div>
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center gap-5 w-full bg-white rounded-xl px-10 py-4 mb-2"
          >
            {/* Image and details */}
            <div className="flex flex-row items-center gap-5 w-2/5 min-w-[250px]">
              <img
                src={item?.image}
                alt="product...."
                className="rounded-md object-cover h-[17vh] w-[8vw] min-w-[80px]"
              />
              <div className="flex flex-col">
                <h5 className="text-xl font-semibold mb-2">{item?.name}</h5>
                <h5 className="text-lg font-small">{item?.brand}</h5>
              </div>
            </div>
            {/* Product value */}
            <div className="flex-1 flex justify-center">
              <div className="flex flex-row justify-start items-center gap-3">
                <button
                  onClick={() => increaseValue(index)}
                  className="inline-flex items-center gap-1 border-1 border-black px-3 py-1 bg-white text-black text-sm font-medium shadow-2xl cursor-pointer rounded hover:bg-blue-500 transition"
                >
                  +
                </button>
                <h5 className="text-lg font-semibold  ">{quantities[index]}</h5>

                <button
                  onClick={() => decreaseValue(index)}
                  className="inline-flex items-center gap-1 border-1 border-black px-3 py-1 bg-white text-black text-sm font-medium shadow-2xl cursor-pointer rounded hover:bg-blue-500 transition"
                >
                  -
                </button>
              </div>
            </div>
            {/* Price and remove */}
            <div className="flex flex-row items-center gap-4 min-w-[120px] justify-end">
              <h5 className="text-lg font-semibold mb-2 text-blue-600 ">
                {item?.price * quantities[index]}/-
              </h5>
              <MdCancel className="w-6 h-6 cursor-pointer" />
            </div>
          </div>
        ))}
        <div className="flex flex-col bg-white shadow-xl justify-end items-end ml-auto p-3 rounded-2xl ">
          <div className="flex flex-col justify-end items-center space-y-2 ">
            <h1 className="text-xl text-black  font-semibold">
              <span className=" text-gray-600">Order Total:</span> Rs 31456/-
            </h1>
            <h1 className="text-gray-600">{cart.length} items in Cart </h1>
            <button className="flex flex-col items-center gap-1 w-full py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
