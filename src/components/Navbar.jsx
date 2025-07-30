import React from "react";
import logo from "../assets/headerLogo.jpg";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="h-20 bg-white shadow-2xl px-10 flex flex-row justify-between items-center w-full">
      <div className="flex space-x-5">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="image"
          className="w-25 h-10"
        />
      </div>
      <div className="flex flex-row space-x-5">
        <ul className="flex gap-x-15 text-black font-roboto items-center text-lg">
          <li>
            <Link to="/" className="hover:text-black">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-black">
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-black">
              Cart
            </Link>
          </li>
        </ul>
        <button
          type="submit"
          className="bg-blue-500 text-white h-10 w-20 cursor-pointer hover:bg-blue-700  rounded-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
