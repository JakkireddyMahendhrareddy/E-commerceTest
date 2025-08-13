import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get("jwtToken");
  const location = useLocation();

  // If no token, redirect to login with the current location
  if (!jwtToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If token exists, render the protected component
  return children;
};

export default ProtectedRoute;
