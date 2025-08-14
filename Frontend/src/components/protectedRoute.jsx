import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get("jwtToken");
  const location = useLocation();

  useEffect(() => {
    console.log("🔒 ProtectedRoute Debug:", {
      hasToken: !!jwtToken,
      currentPath: location.pathname,
      tokenValue: jwtToken ? "Present" : "Missing",
    });
  }, [jwtToken, location.pathname]);

  // If no token, redirect to login with the current location
  if (!jwtToken) {
    console.log(
      "🚫 No token found, redirecting to login from:",
      location.pathname
    );
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If token exists, render the protected component
  console.log(
    "✅ Token found, rendering protected component:",
    location.pathname
  );
  return children;
};

export default ProtectedRoute;
