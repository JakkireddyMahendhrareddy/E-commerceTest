import React from "react";

const Fotter = () => {
  return (
    <>
      <footer className=" bg-gray-900 px-20 py-8  text-gray-300 shadow-amber-50 rounded-b-md  flex flex-col justify-start items-center w-full">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div>
            <h2 className="text-white text-xl font-bold mb-4">
              Nxt <span className="text-blue-500">Trendz</span>
            </h2>
            <p className="text-sm">
              Your go-to fashion destination for premium styles, party wear, and
              timeless elegance. Dress to express.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Men
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Women
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Party Wear
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white">
                  Cart
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-white">
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@nxttrendz.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Hyderabad, India</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
          © 2025 Nxt Trendz. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Fotter;
