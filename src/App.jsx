import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./pages/shop";
import Products from "./pages/products";
import Orders from "./pages/orders";
import Carts from "./pages/carts";
import AdminProdcut from "./pages/adminProduct";
import AddProduct from "./pages/addProduct";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col justify-start min-h-screen">
      <Router>
        <Navbar />
        <div className="flex flex-col justify-start items-center bg-gray-100 h-[100vh] w-full">
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/products" element={<Products />} />
            <Route path="/carts" element={<Carts />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/add-products" element={<AddProduct />} />
            <Route path="/admin-products" element={<AdminProdcut />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
