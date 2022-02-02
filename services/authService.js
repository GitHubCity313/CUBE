import axiosInstance from "./instance";

const authService = {
  // API
  signIn: (credentials) => axiosInstance.post(`/auth/signIn`, credentials),
  signOut: (token) =>
    axiosInstance.post(`/auth/signOut`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  // Verifie la validite du token a la premiere connexion
  checkToken: (token) =>
    axiosInstance.post(`/auth/checkToken`, {
      headers: { Authorization: token },
    }),
  // Local storage
  store: (token) => localStorage.setItem("JWT", token),
  get: () => localStorage.getItem("JWT"),
  delete: async () => localStorage.removeItem("JWT"),
  clear: () => localStorage.clear(),
};

export default authService;
