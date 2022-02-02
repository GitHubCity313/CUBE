import axiosInstance from "./instance";

const authService = {
  // API
  signIn: (credentials) => axiosInstance.post(`/auth/signIn`, credentials),
  signOut: (token) =>
    axiosInstance.post(`/auth/signOut`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  // Local storage
  store: (token) => localStorage.setItem("JWT", token),
  get: () => localStorage.getItem("JWT"),
  delete: () => localStorage.removeItem("JWT"),
  clear: () => localStorage.clear(),
};

export default authService;
