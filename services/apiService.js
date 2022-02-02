import axiosInstance from "./instance";

const apiService = {
  getItems: (item) => axiosInstance.get(item),
  getItem: (item, id) => axiosInstance.get(`${item}/${id}`),
  createItem: (item, data) =>
    axiosInstance.post(`${item}`, JSON.stringify(data), {
      headers: { Authorization: `Bearer ${token}` },
    }),
  updateItem: (item, id, data) =>
    axiosInstance.put(`${item}/${id}`, JSON.stringify(data), {
      headers: { Authorization: `Bearer ${token}` },
    }),
  deleteItem: (item, id) =>
    axiosInstance.delete(`${item}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default apiService;
