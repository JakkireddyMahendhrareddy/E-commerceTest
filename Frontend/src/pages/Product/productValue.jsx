import React, { useState } from "react";

const ProductValue = () => {
  const [value, setValue] = useState(1);

  const increaseValue = () => {
    setValue(value + 1);
  };

  const decreaseValue = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-start items-center gap-3">
        <button
          onClick={increaseValue}
          className="inline-flex items-center gap-1 border-1 border-black px-3 py-1 bg-white text-black text-sm font-medium shadow-2xl cursor-pointer rounded hover:bg-blue-500 transition"
        >
          +
        </button>
        <h5 className="text-lg font-semibold  ">{value}</h5>

        <button
          onClick={decreaseValue}
          className="inline-flex items-center gap-1 border-1 border-black px-3 py-1 bg-white text-black text-sm font-medium shadow-2xl cursor-pointer rounded hover:bg-blue-500 transition"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default ProductValue;
