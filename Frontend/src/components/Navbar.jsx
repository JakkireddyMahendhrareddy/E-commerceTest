import React, { useState } from "react";
import logo from "../assets/headerLogo.jpg";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-16 md:h-20 bg-white shadow-amber-50 rounded-b-md px-4 md:px-8 lg:px-20 flex flex-row justify-between items-center w-full">
      <Link to="/">
        <div className="flex flex-row items-center justify-center">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="image"
            className="h-8 md:h-10"
          />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-row gap-x-4 lg:gap-x-8">
        <ul className="flex gap-x-4 lg:gap-x-10 text-black font-roboto items-center text-base lg:text-lg">
          <li>
            <Link
              to="/"
              className="hover:text-blue-500 text-black font-bold text-lg lg:text-xl"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:text-blue-500 text-black font-bold text-lg lg:text-xl"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="hover:text-blue-500 text-black font-bold text-lg lg:text-xl"
            >
              Cart
            </Link>
          </li>
        </ul>
        <Link to="/login">
          <Logout setIsMenuOpen={setIsMenuOpen} />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span
          className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden z-50">
          <div className="flex flex-col py-4 px-4">
            <ul className="flex flex-col gap-y-4 text-black font-roboto">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-500 text-black font-bold text-lg block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-blue-500 text-black font-bold text-lg block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-blue-500 text-black font-bold text-lg block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart
                </Link>
              </li>
            </ul>
            <Link to="/login" className="mt-4">
              <Logout setIsMenuOpen={setIsMenuOpen} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
