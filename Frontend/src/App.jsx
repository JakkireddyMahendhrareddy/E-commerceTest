import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/Product/products";
import Home from "./pages/Home";
import Cart from "./pages/Cart/cart";
import Product from "./pages/Product/product";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <div className="flex flex-col justify-start min-h-screen">
      <Router>
        <div className="flex flex-col bg-gray-100 w-full min-h-screen">
          <Routes>
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
            />
            <Route
              path="/smiliar-products/:id"
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 404 Route */}
            <Route
              path="*"
              element={<div className="p-8 text-center">Page Not Found</div>}
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </div>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Products from "./pages/Product/products";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart/cart";
// import Product from "./pages/Product/product";
// import Login from "./pages/Auth/login";
// import Register from "./pages/Auth/register";

// function App() {
//   return (
//     <div className="flex flex-col justify-start min-h-screen">
//       <Router>
//         <div className="flex flex-col bg-gray-100 w-full min-h-screen">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/products/:id" element={<Product />} />
//             <Route path="/smiliar-products/:id" element={<Product />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             {/* Add 404 route */}
//             <Route
//               path="*"
//               element={<div className="p-8 text-center">Page Not Found</div>}
//             />
//           </Routes>
//           <ToastContainer
//             position="top-right"
//             autoClose={1000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//           />
//         </div>
//       </Router>
//     </div>
//   );
// }

// export default App;
