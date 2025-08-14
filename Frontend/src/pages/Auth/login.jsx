import React, { useState, useEffect } from "react";
import {
  API_ROUTES,
  errorViewToastNotificationSettings,
  loginSuccessToastNotificationSettings,
  logoutToastNotificationSettings,
  toastNotificationSettings,
} from "../../utils/apiRoutes";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import validator from "validator";
import {
  logAPIConfig,
  testAPIEndpoints,
  testBackendHealth,
} from "../../utils/apiTest";

const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Handle logout toast notification - SIMPLE VERSION
  useEffect(() => {
    // Check if user just logged out
    console.log(API_ROUTES.USERS.LOGIN, "llllllllllllllll");

    // Log API configuration for debugging
    logAPIConfig();

    const justLoggedOut = localStorage.getItem("justLoggedOut");

    if (justLoggedOut === "true") {
      console.log("Showing logout toast...");

      // Show the toast notification
      toast.success(
        "👋 You've been logged out successfully.",
        logoutToastNotificationSettings
      );

      // Remove the flag so it doesn't show again
      localStorage.removeItem("justLoggedOut");
    }
  }, []); // ✅ Empty dependency array - runs only once when component mounts

  // ✅ Check if user is already logged in
  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const loginUser = async (userCredentials) => {
    try {
      console.log("Attempting login to:", API_ROUTES.USERS.LOGIN);
      console.log("User credentials:", {
        email: userCredentials.email,
        password: "***",
      });

      const response = await fetch(API_ROUTES.USERS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userCredentials),
        mode: "cors",
        credentials: "omit",
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error response:", errorData);
        throw new Error(
          `HTTP ${response.status}: ${errorData.message || "Login failed"}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);

      const { message, jwtToken, userId } = data;

      if (!jwtToken) {
        throw new Error("No authentication token received");
      }

      toast.success(message, loginSuccessToastNotificationSettings);
      Cookies.set("jwtToken", jwtToken, { expires: 0.25 });
      localStorage.setItem("userId", userId);

      navigate("/");
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });

      let errorMessage = "Login failed. Please try again.";
      let errorType = "error";

      if (error.message.includes("Failed to fetch")) {
        errorMessage =
          "Cannot connect to server. The backend might be down or sleeping.";
        errorType = "warning";
      } else if (error.message.includes("NetworkError")) {
        errorMessage = "Network error. Please check your internet connection.";
        errorType = "error";
      } else if (error.message.includes("HTTP")) {
        errorMessage = error.message;
        errorType = "error";
      } else if (error.message.includes("No authentication token")) {
        errorMessage = "Invalid response from server. Please try again.";
        errorType = "error";
      } else if (error.message.includes("CORS")) {
        errorMessage = "CORS error. Backend server configuration issue.";
        errorType = "warning";
      }

      if (errorType === "warning") {
        toast.warning(errorMessage, errorViewToastNotificationSettings);
      } else {
        toast.error(errorMessage, errorViewToastNotificationSettings);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    if (!validator.isEmail(email)) {
      setErrorMessage("Invalid Email");
      return;
    }

    const userCredentials = {
      email,
      password,
    };
    loginUser(userCredentials);
    setUserDetails({ email: "", password: "" });
  };
  return (
    <div className="flex flex-col  lg:flex-row justify-center bg-gray-300 items-center min-h-screen px-4 lg:px-0 ">
      <div className="flex flex-col lg:flex-row justify-center gap-7 mt-4 mb-4 lg:mt-0 lg:gap-20 min-h-screen items-center w-full max-w-5xl">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="w-full  max-w-sm md:max-w-md lg:w-[33vw] h-48 md:h-64 lg:h-[50vh] object-contain lg:object-cover"
          alt="register"
        />

        {/* Form Container - Full width on mobile */}
        <div className="flex flex-col  w-full max-w-full sm:max-w-sm md:max-w-md lg:w-[30vw] lg:min-h-[50vh] justify-center items-center bg-white shadow-lg p-6 md:p-8 rounded-xl mb-4 lg:mb-0 lg:mt-5 mx-4 sm:mx-0">
          {/* Logo */}
          <div className="flex flex-row items-center justify-center mb-4">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="logo"
              className="h-8 md:h-10"
            />
          </div>

          {/* Error Message */}
          {/* {errorMessage && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {errorMessage.split("\n").map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )} */}

          {/* Form */}
          <form
            className="flex flex-col space-y-4 md:space-y-5 w-full mt-3"
            onSubmit={handleSubmit}
          >
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-semibold text-sm md:text-base"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email...."
                id="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                className="bg-gray-200 font-semibold py-3 md:py-3 px-3 md:px-3 w-full rounded-lg text-sm md:text-base"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-semibold text-sm md:text-base"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password...."
                id="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                className="bg-gray-200 font-semibold py-3 md:py-3 px-3 md:px-3 w-full rounded-lg text-sm md:text-base"
                required
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="flex flex-col mt-6 md:mt-8 cursor-pointer items-center gap-1 py-3 md:py-2 bg-blue-500 text-white text-lg md:text-xl font-medium rounded-lg hover:bg-blue-600 transition w-full"
              >
                Login
              </button>
            </div>
          </form>

          {/* Debug Section - Only in Development */}
          {import.meta.env.DEV && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Debug Tools</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={async () => {
                    const results = await testAPIEndpoints();
                    console.log("API Test Results:", results);
                    toast.info("Check console for API test results", {
                      autoClose: 3000,
                    });
                  }}
                  className="text-xs bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  Test API
                </button>
                <button
                  onClick={() => {
                    logAPIConfig();
                    toast.info("API config logged to console", {
                      autoClose: 2000,
                    });
                  }}
                  className="text-xs bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  Log Config
                </button>
                <button
                  onClick={async () => {
                    const health = await testBackendHealth();
                    toast.info(
                      "Backend health check completed. Check console.",
                      {
                        autoClose: 4000,
                      }
                    );
                  }}
                  className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Health Check
                </button>
              </div>
            </div>
          )}

          {/* Register Link */}
          <p className="mt-4 text-xs md:text-sm text-center text-gray-600">
            Don’t have an account?{"   "}
            <Link to="/register" className="text-blue-800 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
