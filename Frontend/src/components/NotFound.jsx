import React from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-4">
          The page you're looking for doesn't exist.
        </p>

        {/* Debug Information */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <h3 className="font-semibold text-sm text-gray-700 mb-2">
            Debug Info:
          </h3>
          <p className="text-xs text-gray-600 mb-1">
            <strong>Current URL:</strong> {location.pathname}
          </p>
          <p className="text-xs text-gray-600 mb-1">
            <strong>Search:</strong> {location.search || "None"}
          </p>
          <p className="text-xs text-gray-600">
            <strong>Hash:</strong> {location.hash || "None"}
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Home
          </Link>
          <Link
            to="/login"
            className="block w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Go to Login
          </Link>
          <button
            onClick={() => window.history.back()}
            className="block w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
