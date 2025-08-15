import React from "react";
import Navbar from "../components/Navbar";
import Fotter from "../components/Fotter";
import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck, MapPin, Calendar } from "lucide-react";

const Ship = () => {
  const trackingNumber =
    "SF" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-200 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6 shadow-xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Order Shipped Successfully!
            </h1>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Great news! Your package is on its way. We'll keep you updated
              every step of the journey.
            </p>
          </div>

          {/* Tracking Info Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                  <Package className="w-6 h-6 mr-3 text-blue-600" />
                  Shipping Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="text-blue-700 font-medium">
                      Tracking Number:
                    </span>
                    <span className="font-bold text-blue-900 text-lg">
                      {trackingNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="text-blue-700 font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Estimated Delivery:
                    </span>
                    <span className="font-bold text-blue-900">
                      {estimatedDelivery.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="text-blue-700 font-medium flex items-center">
                      <Truck className="w-4 h-4 mr-2" />
                      Shipping Method:
                    </span>
                    <span className="font-bold text-blue-900">
                      Express Delivery
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                  Delivery Status
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                    <div>
                      <p className="font-bold text-green-800">
                        Order Confirmed
                      </p>
                      <p className="text-sm text-green-600">
                        Your order has been processed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-100 rounded-lg border border-blue-300">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                    <div>
                      <p className="font-bold text-blue-800">Package Shipped</p>
                      <p className="text-sm text-blue-600">
                        Your package is in transit
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <p className="font-medium text-gray-600">
                        Out for Delivery
                      </p>
                      <p className="text-sm text-gray-500">Coming soon...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Track Your Package
            </button>
            <Link to="/products">
              <button className="bg-white cursor-pointer hover:bg-blue-50 text-blue-600 font-bold py-4 px-8 rounded-xl shadow-lg border-2 border-blue-600 transition-all duration-200 transform hover:scale-105">
                Continue Shopping
              </button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              What's Next?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-blue-900 mb-2">
                  Package Prepared
                </h4>
                <p className="text-blue-700 text-sm">
                  Your items are carefully packed and ready for delivery
                </p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-blue-900 mb-2">In Transit</h4>
                <p className="text-blue-700 text-sm">
                  Your package is on its way to your delivery address
                </p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-blue-900 mb-2">Delivered</h4>
                <p className="text-blue-700 text-sm">
                  Enjoy your purchase! We hope you love what you ordered
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Fotter />
    </>
  );
};

export default Ship;
