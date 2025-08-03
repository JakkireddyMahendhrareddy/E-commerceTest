import React, { useContext } from "react";
import { useState } from "react";

import Fotter from "../../components/Fotter";
import EmptyCartView from "./emptyCartView";
import CartItems from "./cartItems";
import Navbar from "../../components/Navbar";
import { CartContext } from "../Cart/cartContext";

const Cart = () => {
  const { cart } = useContext(CartContext); // Access cart from context

  return (
    <>
      <Navbar />
      {cart.length === 0 ? <EmptyCartView /> : <CartItems />}
      <Fotter />
    </>
  );
};

export default Cart;
