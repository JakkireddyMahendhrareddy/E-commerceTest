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
import ErrorBoundary from "./components/ErrorBoundary";
// import HealthCheck from "./components/HealthCheck";
// import NetworkStatus from "./components/NetworkStatus";
import NotFound from "./components/NotFound";
import Ship from "./pages/ship";

function App() {
  return (
    <ErrorBoundary>
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
                path="/similar-products/:id"
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
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Ship />
                  </ProtectedRoute>
                }
              />

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
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
        {/* <HealthCheck />
      <NetworkStatus /> */}
      </div>
    </ErrorBoundary>
  );
}

export default App;
