import React from "react";
import { Link } from "react-router-dom";
import Fotter from "../components/Fotter";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col-reverse md:flex-row justify-center items-center min-h-screen px-10 md:ml-10 py-8 gap-8 md:gap-10">
        {/* Text Section */}
        <div className="flex flex-col justify-center items-start md:w-1/2 w-full gap-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-roboto">
            Clothes That Get YOU Noticed
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-6">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you be seen and heard
            the way you are. So, celebrate the season's new and exciting fashion
            in your own way.
          </p>
          <Link to="/products" className="w-full sm:w-auto">
            <button
              type="button"
              className="bg-blue-500 cursor-pointer text-white font-semibold h-10 px-5 w-full sm:w-auto hover:bg-blue-700 rounded-sm"
            >
              Shop Now
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="clothes that get you noticed"
            className="w-[80%] sm:w-[70%] md:w-[100%] max-w-[400px] h-auto object-cover"
          />
        </div>
      </div>
      <Fotter />
    </>
  );
};

export default Home;
