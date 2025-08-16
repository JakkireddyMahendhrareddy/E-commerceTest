// // Use environment variable with fallback to production URL
// export const BASE_URL = "https://e-commercebackend-25v0.onrender.com";
// //"http://localhost:5000";
// //"https://e-commercebackend-production-faf1.up.railway.app";
// //";
// // ||;

// export const API_ROUTES = {
//   USERS: {
//     LOGIN: `${BASE_URL}/api/users/login`,
//     REGISTER: `${BASE_URL}/api/users/register`,
//   },
//   PRODUCT: {
//     CREATE_PRODUCT: `${BASE_URL}/api/product/create`,
//     GET_PRODUCTS: `${BASE_URL}/api/product/all`,
//     GET_PRODUCT: `${BASE_URL}/api/product`,
//     UPDATE_PRODUCT: `${BASE_URL}/api/product/update`,
//     DELETE_PRODUCT: `${BASE_URL}/api/product/delete`,
//     CATEGORY_PRODUCTS: `${BASE_URL}/api/product/category`,
//     SEARCH_PRODUCTS: `${BASE_URL}/api/product/search`,
//   },
//   CART: {
//     ADD_CART: `${BASE_URL}/api/cart/add`,
//     GET_CARTS: `${BASE_URL}/api/cart/all`,
//     DELETE_PRODUCTS: `${BASE_URL}/api/cart/delete/all`,
//     DELETE_PRODUCT: `${BASE_URL}/api/cart/delete`,
//     UPDATE_CART_QUANTITY: `${BASE_URL}/api/cart/update/quantity`,
//   },
//   IMAGE_UPLOAD: {
//     SINGLE_IMAGE: `${BASE_URL}/api/upload`,
//   },
// };

// export const toastNotificationSettings = {
//   autoClose: 1000,
//   pauseOnHover: false,
//   closeOnClick: false,
// };
// export const registerSuccessToastNotificationSettings = {
//   autoClose: 3000,
//   pauseOnHover: false,
//   closeOnClick: false,
//   closeButton: false,
//   position: "top-center",
//   icon: false,
//   className: "custom-toast-register",
//   bodyClassName: "custom-toast-body",
//   hideProgressBar: true,
// };
// export const loginSuccessToastNotificationSettings = {
//   autoClose: 3000,
//   pauseOnHover: false,
//   closeOnClick: false,
//   closeButton: false,
//   position: "top-center",
//   icon: false,
//   className: "custom-toast-register",
//   hideProgressBar: true,
// };
// export const logoutToastNotificationSettings = {
//   autoClose: 3000,
//   pauseOnHover: false,
//   closeOnClick: false,
//   closeButton: false,
//   position: "top-center",
//   icon: false,
//   className: "custom-toast-logout",
//   hideProgressBar: true,
// };
// export const errorViewToastNotificationSettings = {
//   autoClose: 3000,
//   pauseOnHover: false,
//   closeOnClick: false,
//   icon: false,
//   className: "custom-toast-error",
//   progress: false,
//   closeButton: false,
// };

// Use environment variable with fallback to production URL
export const BASE_URL = "https://e-commercebackend-25v0.onrender.com";
//"http://localhost:5000";
//"https://e-commercebackend-production-faf1.up.railway.app";
//";
// ||;

export const API_ROUTES = {
  USERS: {
    LOGIN: `${BASE_URL}/api/users/login`,
    REGISTER: `${BASE_URL}/api/users/register`,
  },
  PRODUCT: {
    CREATE_PRODUCT: `${BASE_URL}/api/product/create`,
    GET_PRODUCTS: `${BASE_URL}/api/product/all`,
    GET_PRODUCT: `${BASE_URL}/api/product`,
    UPDATE_PRODUCT: `${BASE_URL}/api/product/update`,
    DELETE_PRODUCT: `${BASE_URL}/api/product/delete`,
    CATEGORY_PRODUCTS: `${BASE_URL}/api/product/category`,
    SEARCH_PRODUCTS: `${BASE_URL}/api/product/search`,
  },
  CART: {
    ADD_CART: `${BASE_URL}/api/cart/add`,
    GET_CARTS: `${BASE_URL}/api/cart/all`,
    DELETE_PRODUCTS: `${BASE_URL}/api/cart/delete/all`,
    DELETE_PRODUCT: `${BASE_URL}/api/cart/delete`,
    UPDATE_CART_QUANTITY: `${BASE_URL}/api/cart/update/quantity`,
  },
  IMAGE_UPLOAD: {
    SINGLE_IMAGE: `${BASE_URL}/api/upload`,
    MULTIPLE_IMAGES: `${BASE_URL}/api/upload-multiple`,
    DELETE_IMAGE: `${BASE_URL}/api/upload`, // For DELETE requests with public_id
  },
};

export const toastNotificationSettings = {
  autoClose: 1000,
  pauseOnHover: false,
  closeOnClick: false,
};

export const registerSuccessToastNotificationSettings = {
  autoClose: 3000,
  pauseOnHover: false,
  closeOnClick: false,
  closeButton: false,
  position: "top-center",
  icon: false,
  className: "custom-toast-register",
  bodyClassName: "custom-toast-body",
  hideProgressBar: true,
};

export const loginSuccessToastNotificationSettings = {
  autoClose: 3000,
  pauseOnHover: false,
  closeOnClick: false,
  closeButton: false,
  position: "top-center",
  icon: false,
  className: "custom-toast-register",
  hideProgressBar: true,
};

export const logoutToastNotificationSettings = {
  autoClose: 3000,
  pauseOnHover: false,
  closeOnClick: false,
  closeButton: false,
  position: "top-center",
  icon: false,
  className: "custom-toast-logout",
  hideProgressBar: true,
};

export const errorViewToastNotificationSettings = {
  autoClose: 3000,
  pauseOnHover: false,
  closeOnClick: false,
  icon: false,
  className: "custom-toast-error",
  progress: false,
  closeButton: false,
};

// Additional utility for dynamic BASE_URL switching
export const getImageUploadUrl = (endpoint = "single") => {
  const endpoints = {
    single: API_ROUTES.IMAGE_UPLOAD.SINGLE_IMAGE,
    multiple: API_ROUTES.IMAGE_UPLOAD.MULTIPLE_IMAGES,
    delete: API_ROUTES.IMAGE_UPLOAD.DELETE_IMAGE,
  };
  return endpoints[endpoint] || endpoints.single;
};

// Helper function for Cloudinary image transformations
export const getCloudinaryUrl = (publicId, transformations = {}) => {
  if (!publicId) return null;

  const {
    width = "auto",
    height = "auto",
    crop = "limit",
    quality = "auto",
    format = "auto",
  } = transformations;

  return `https://res.cloudinary.com/your-cloud-name/image/upload/w_${width},h_${height},c_${crop},q_${quality},f_${format}/${publicId}`;
};

// Environment configuration helper
export const getEnvironment = () => {
  if (BASE_URL.includes("localhost")) return "development";
  if (BASE_URL.includes("render.com")) return "production";
  if (BASE_URL.includes("railway.app")) return "staging";
  return "unknown";
};
