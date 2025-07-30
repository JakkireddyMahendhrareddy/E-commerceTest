import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/cart";

function App() {
  return (
    <div className="flex flex-col justify-start min-h-screen">
      <Router>
        <Navbar />
        <div className="flex flex-col justify-start items-center bg-gray-100 h-[100vh] w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
