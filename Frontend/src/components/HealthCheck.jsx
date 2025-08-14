import React, { useState, useEffect } from 'react';
import { API_ROUTES } from '../utils/apiRoutes';

const HealthCheck = () => {
  const [status, setStatus] = useState('checking');
  const [details, setDetails] = useState('');

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      setStatus('checking');
      setDetails('Checking API connection...');

      const response = await fetch(API_ROUTES.PRODUCT.GET_PRODUCTS);
      
      if (response.ok) {
        setStatus('healthy');
        setDetails(`API is responding (Status: ${response.status})`);
      } else {
        setStatus('unhealthy');
        setDetails(`API responded with status: ${response.status}`);
      }
    } catch (error) {
      setStatus('error');
      setDetails(`Connection failed: ${error.message}`);
    }
  };

  if (import.meta.env.PROD) {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs">
      <h3 className="font-semibold text-sm mb-2">API Health Check</h3>
      <div className="text-xs">
        <div className="flex items-center gap-2 mb-1">
          <span>Status:</span>
          <span className={`px-2 py-1 rounded text-xs ${
            status === 'healthy' ? 'bg-green-100 text-green-800' :
            status === 'unhealthy' ? 'bg-yellow-100 text-yellow-800' :
            status === 'error' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {status}
          </span>
        </div>
        <p className="text-gray-600 mb-2">{details}</p>
        <button
          onClick={checkHealth}
          className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default HealthCheck;
