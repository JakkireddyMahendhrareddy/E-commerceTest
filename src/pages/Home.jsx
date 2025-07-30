import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen space-x-5">
        <div className="flex flex-col justify-center items-start w-[50vw] gap-y-10">
          <h1 className="text-5xl font-roboto font-semibold">
            Clothes That Get YOU Noticed
          </h1>
          <p className="text-sm line-space-2">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <Link to="/products">
            <button
              type="button"
              className="bg-blue-500 text-white h-10 w-20 cursor-pointer hover:bg-blue-700  rounded-sm"
            >
              Shop Now
            </button>
          </Link>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes that get you noticed"
          className="w-[30vw] h-[50vh]"
        />
      </div>
    </>
  );
};

export default Home;
