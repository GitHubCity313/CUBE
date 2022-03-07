import axiosInstance from "./instance";

const authService = {
  // API
  signIn: (credentials, refetchInterval) =>
    axiosInstance.post(`/auth/signIn`, { credentials, refetchInterval }),
  signUp: (user) => axiosInstance.post(`/auth/signUp`, { user }),
  signOut: (token) =>
    axiosInstance.post(`/auth/signOut`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  // Verifie la validite du token a la premiere connexion
  checkToken: (token) =>
    axiosInstance.post(`/auth/checkToken`, {
      headers: { Authorization: token },
    }),
  getRole: (id, token) => {
    console.log(id);
    return axiosInstance.post(
      `/auth/permissions`,
      { id: id },
      {
        headers: { Authorization: token },
      }
    );
  },
  // Local storage
  store: (token) => localStorage.setItem("JWT", token),
  get: () => localStorage.getItem("JWT"),
  delete: async () => localStorage.removeItem("JWT"),
  clear: () => localStorage.clear(),
};

export default authService;
