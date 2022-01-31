import axiosInstance from "./instance";

const apiService = {
  getItems: (item) => axiosInstance.get(item),
  getItem: (item, id) => axiosInstance.get(`${item}/${id}`),
  createItem: (item, data) =>
    axiosInstance.post(`${item}`, JSON.stringify(data)),
  updateItem: (item, id, data) =>
    axiosInstance.put(`${item}/${id}`, JSON.stringify(data)),
  deleteItem: (item, id) => axiosInstance.delete(`${item}/${id}`),
  login: (user) => axiosInstance.post(`/auth/test`, JSON.stringify(user)),
};

export default apiService;
