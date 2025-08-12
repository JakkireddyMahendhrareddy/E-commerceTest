import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = ({ setIsMenuOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logouts button clicked");

    // Close mobile menu if it's open
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }

    // Remove the JWT token
    Cookies.remove("jwtToken");
    console.log("Token removed");

    // ✅ Set logout flag in localStorage
    localStorage.setItem("justLoggedOut", "true");

    // Navigate to login page
    navigate("/login");
    console.log("Navigated to login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-500 text-white h-8 md:h-10 text-sm md:text-lg font-semibold w-16 md:w-20 cursor-pointer hover:bg-blue-700 rounded-sm transition-colors duration-200"
    >
      Logout
    </button>
  );
};

export default Logout;
