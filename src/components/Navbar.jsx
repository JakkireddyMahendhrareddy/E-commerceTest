import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="h-20 bg-orange-400 flex items-center w-full">
      <ul className="flex justify-center items-center gap-x-15 text-white text-lg w-full">
        <li>
          <Link to="/" className="hover:text-black">
            shop
          </Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-black">
            products
          </Link>
        </li>
        <li>
          <Link to="/orders" className="hover:text-black">
            orders
          </Link>
        </li>
        <li>
          <Link to="/carts" className="hover:text-black">
            carts
          </Link>
        </li>
        <li>
          <Link to="/add-products" className="hover:text-black">
            Add products
          </Link>
        </li>
        <li>
          <Link to="/admin-products" className="hover:text-black">
            Admin product
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
