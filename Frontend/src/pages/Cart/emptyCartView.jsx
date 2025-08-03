import { Link } from "react-router-dom";

const EmptyCartView = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6  rounded ">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      alt="cart empty"
      className="w-80 h-80 mb-4"
    />
    <h1 className="text-2xl font-semibold text-gray-700 mb-4">
      Your Cart Is Empty
    </h1>
    <Link to="/products">
      <button className="bg-blue-500 font-semibold cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow transition-all">
        Shop Now
      </button>
    </Link>
  </div>
);

export default EmptyCartView;
