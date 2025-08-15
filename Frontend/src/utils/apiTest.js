// // API Testing Utilities
// import { API_ROUTES } from "./apiRoutes";

// export const testAPIEndpoints = async () => {
//   const results = {};

//   // Test login endpoint
//   try {
//     const loginResponse = await fetch(API_ROUTES.USERS.LOGIN, {
//       method: "HEAD",
//       mode: "cors",
//     });
//     results.login = {
//       status: loginResponse.status,
//       ok: loginResponse.ok,
//       url: API_ROUTES.USERS.LOGIN,
//     };
//   } catch (error) {
//     results.login = {
//       error: error.message,
//       url: API_ROUTES.USERS.LOGIN,
//     };
//   }

//   // Test products endpoint
//   try {
//     const productsResponse = await fetch(API_ROUTES.PRODUCT.GET_PRODUCTS, {
//       method: "HEAD",
//       mode: "cors",
//     });
//     results.products = {
//       status: productsResponse.status,
//       ok: productsResponse.ok,
//       url: API_ROUTES.PRODUCT.GET_PRODUCTS,
//     };
//   } catch (error) {
//     results.products = {
//       error: error.message,
//       url: API_ROUTES.PRODUCT.GET_PRODUCTS,
//     };
//   }

//   return results;
// };

// export const testBackendHealth = async () => {
//   console.log("🔍 Testing backend health...");

//   const healthResults = {
//     timestamp: new Date().toISOString(),
//     baseUrl: import.meta.env.VITE_API_URL || "Using fallback URL",
//     tests: {},
//   };

//   // Test 1: Basic connectivity
//   try {
//     const startTime = Date.now();
//     const response = await fetch(API_ROUTES.USERS.LOGIN, {
//       method: "HEAD",
//       mode: "cors",
//       cache: "no-cache",
//     });
//     const endTime = Date.now();

//     healthResults.tests.connectivity = {
//       success: true,
//       status: response.status,
//       responseTime: `${endTime - startTime}ms`,
//       headers: Object.fromEntries(response.headers.entries()),
//     };
//   } catch (error) {
//     healthResults.tests.connectivity = {
//       success: false,
//       error: error.message,
//       errorType: error.name,
//     };
//   }

//   // Test 2: CORS preflight
//   try {
//     const response = await fetch(API_ROUTES.USERS.LOGIN, {
//       method: "OPTIONS",
//       mode: "cors",
//     });

//     healthResults.tests.cors = {
//       success: true,
//       status: response.status,
//       headers: Object.fromEntries(response.headers.entries()),
//     };
//   } catch (error) {
//     healthResults.tests.cors = {
//       success: false,
//       error: error.message,
//     };
//   }

//   // Test 3: Actual API response
//   try {
//     const response = await fetch(API_ROUTES.PRODUCT.GET_PRODUCTS, {
//       method: "GET",
//       mode: "cors",
//     });

//     if (response.ok) {
//       const data = await response.json();
//       healthResults.tests.apiResponse = {
//         success: true,
//         status: response.status,
//         hasData: !!data,
//         dataType: Array.isArray(data) ? "array" : typeof data,
//       };
//     } else {
//       healthResults.tests.apiResponse = {
//         success: false,
//         status: response.status,
//         statusText: response.statusText,
//       };
//     }
//   } catch (error) {
//     healthResults.tests.apiResponse = {
//       success: false,
//       error: error.message,
//     };
//   }

//   console.log("🏥 Backend Health Check Results:", healthResults);
//   return healthResults;
// };

// export const logAPIConfig = () => {
//   console.log("=== API Configuration ===");
//   console.log(
//     "Base URL:",
//     import.meta.env.VITE_API_URL || "Using fallback URL"
//   );
//   console.log("Login URL:", API_ROUTES.USERS.LOGIN);
//   console.log("Products URL:", API_ROUTES.PRODUCT.GET_PRODUCTS);
//   console.log("Environment:", import.meta.env.MODE);
//   console.log("=======================");
// };
