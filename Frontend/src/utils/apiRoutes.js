// export const BASE_URL = "https://e-commercebackend-1-k8yl.onrender.com";
export const BASE_URL = "http://localhost:5000";

export const API_ROUTES = {
  USERS: {
    LOGIN: `${BASE_URL}/api/users/login`,
    REGISTER: `${BASE_URL}/api/users/register`,
  },
  PRODUCT: {
    CREATE_PRODUCT: `${BASE_URL}/api/product/create`,
    GET_PRODUCTS: `${BASE_URL}/api/product/all`,
  },
  IMAGE_UPLOAD: {
    SINGLE_IMAGE: `${BASE_URL}/api/upload`,
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
