import React, { useState, useEffect } from "react";
import { API_ROUTES } from "../utils/apiRoutes";

const NetworkStatus = () => {
  const [status, setStatus] = useState("checking");
  const [lastCheck, setLastCheck] = useState(null);

  const checkConnection = async () => {
    try {
      setStatus("checking");
      const startTime = Date.now();

      const response = await fetch(API_ROUTES.USERS.LOGIN, {
        method: "HEAD", // Just check if endpoint is reachable
        mode: "cors",
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (response.ok) {
        setStatus("connected");
        setLastCheck(`Connected (${responseTime}ms)`);
      } else {
        setStatus("error");
        setLastCheck(`HTTP ${response.status}`);
      }
    } catch (error) {
      setStatus("disconnected");
      setLastCheck(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (import.meta.env.PROD) {
    return null; // Don't show in production
  }

  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "bg-green-500";
      case "checking":
        return "bg-yellow-500";
      case "error":
        return "bg-orange-500";
      case "disconnected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "connected":
        return "Connected";
      case "checking":
        return "Checking...";
      case "error":
        return "Error";
      case "disconnected":
        return "Disconnected";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white p-3 rounded-lg shadow-lg border max-w-xs z-50">
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`}
        ></div>
        <h3 className="font-semibold text-sm">Network Status</h3>
      </div>
      <div className="text-xs">
        <div className="mb-1">
          <span className="font-medium">Status:</span> {getStatusText()}
        </div>
        {lastCheck && (
          <div className="mb-2">
            <span className="font-medium">Last Check:</span> {lastCheck}
          </div>
        )}
        <div className="mb-2">
          <span className="font-medium">API URL:</span>
          <div className="text-xs text-gray-600 break-all mt-1">
            {API_ROUTES.USERS.LOGIN}
          </div>
        </div>
        <button
          onClick={checkConnection}
          className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Test Connection
        </button>
      </div>
    </div>
  );
};

export default NetworkStatus;
