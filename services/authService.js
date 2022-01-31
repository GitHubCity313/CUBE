import axiosInstance from "./instance";

const authService = {
  // API
  signIn: (credentials) => axiosInstance.post(`/auth/signIn`, credentials),
  signOut: () => axiosInstance.post(`/auth/signOut`),
   // Local storage
  store: (token) => localStorage.setItem("JWT", token),
  get: () => localStorage.getItem("JWT"),
  delete: () => localStorage.removeItem("JWT"),
  clear: () => localStorage.clear(),
 
};

export default authService;
