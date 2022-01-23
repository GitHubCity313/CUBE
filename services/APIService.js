import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const APIService = {
  getItems: async (item) => await axiosInstance.get(item),
  getItem: (item, id) => axiosInstance.get(`${item}/${id}`),
  createItem: (item, data) =>
    axiosInstance.post(`${item}`, JSON.stringify(data)),
  updateItem: (item, id, data) =>
    axiosInstance.put(`${item}/${id}`, JSON.stringify(data)),
  deleteItem: (item, id) => axiosInstance.delete(`${item}/${id}`),
};

export default APIService;
