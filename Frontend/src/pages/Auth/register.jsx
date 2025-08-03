import React, { useState } from "react";
import {
  API_ROUTES,
  errorViewToastNotificationSettings,
  registerSuccessToastNotificationSettings,
} from "../../utils/apiRoutes";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const checkFormValidations = () => {
    const { password } = userDetails;
    const errors = [];
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!]).{8,}$/;

    if (!passwordRegex.test(password)) {
      errors.push(
        "Password must include at least one uppercase, one lowercase, one number, and one special character (@, #, $, !)."
      );
    }

    return errors;
  };

  // ✅ Move registerUser function BEFORE handleSubmit
  const registerUser = async (userCredentials) => {
    try {
      console.log("Attempting to register user:", userCredentials);
      console.log("API URL:", API_ROUTES.USERS.RIGESTER);

      const response = await fetch(API_ROUTES.USERS.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        const { message, jwtToken } = data;
        toast.success(message, registerSuccessToastNotificationSettings);
        Cookies.set("jwtToken", jwtToken, { expires: 0.25 });
        navigate("/");
      } else {
        console.error("Registration failed:", data);
        toast.error(
          data.message || "Registration failed",
          errorViewToastNotificationSettings
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.warning(
        "Something went wrong: " + error.message,
        errorViewToastNotificationSettings
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = userDetails;
    const errors = checkFormValidations();

    if (errors.length > 0) {
      setErrorMessage(errors.join("\n"));
      return;
    }

    const newUserCredentials = {
      username,
      email,
      password,
    };

    registerUser(newUserCredentials);
    setErrorMessage("");
    setUserDetails({
      username: "",
      email: "",
      password: "",
    });
  };

  // const token = Cookies.get("jwtToken");
  // if (token !== undefined) return <Navigate to="/" replace />; // Redirect to home page if already logged in

  return (
    <div className="flex flex-col lg:flex-row bg-gray-300 justify-center items-center min-h-screen px-4 lg:px-0 ">
      <div className="flex flex-col lg:flex-row justify-center gap-7 mt-4 mb-4 lg:mt-0 lg:gap-20 min-h-screen items-center w-full max-w-5xl">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="w-full  max-w-sm md:max-w-md lg:w-[33vw] h-48 md:h-64 lg:h-[50vh] object-contain lg:object-cover"
          alt="register"
        />

        {/* Form Container - Full width on mobile */}
        <div className="flex flex-col w-full max-w-full sm:max-w-sm md:max-w-md lg:w-[30vw] lg:min-h-[50vh] justify-center items-center bg-white shadow-md p-6 md:p-8 rounded-xl mb-4 lg:mb-0 lg:mt-5 mx-4 sm:mx-0">
          {/* Logo */}
          <div className="flex flex-row items-center justify-center mb-4">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="logo"
              className="h-8 md:h-10"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {errorMessage.split("\n").map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}

          {/* Form */}
          <form
            className="flex flex-col space-y-4 md:space-y-5 w-full mt-3"
            onSubmit={handleSubmit}
          >
            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="font-semibold text-sm md:text-base"
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username...."
                id="username"
                name="username"
                value={userDetails.username}
                onChange={handleChange}
                className="bg-gray-200 py-3 md:py-3 font-semibold px-3 md:px-3 w-full rounded-lg text-sm md:text-base"
                required
              />
            </div>

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
                Register
              </button>
            </div>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-xs md:text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-800 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
