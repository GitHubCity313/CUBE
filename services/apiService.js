import axios from "axios";
import axiosInstance from "./instance";

const apiService = {
  getItems: (item) => axiosInstance.get(item),
  getItem: (item, id) => axiosInstance.get(`${item}/${id}`),
  createItem: (item, data) =>
    axiosInstance.post(`${item}`, JSON.stringify(data), {
      headers: { Authorization: token },
    }),
  updateItem: (item, id, data) =>
    axiosInstance.put(`${item}/${id}`, JSON.stringify(data), {
      headers: { Authorization: token },
    }),
  deleteItem: (item, id) =>
    axiosInstance.delete(`${item}/${id}`, {
      headers: { Authorization: token },
    }),
  fetchProfile: (token) =>
    axiosInstance.post(`/users/profile`, {
      headers: { Authorization: token },
    }),
  fetchLikes: (token, likes) =>
    axiosInstance.post(`/users/profile?data=likes`, JSON.stringify(likes), {
      headers: { Authorization: token },
    }),
  fetchEvents: (token, events) =>
    axiosInstance.post(`/users/profile?data=events`, JSON.stringify(events), {
      headers: { Authorization: token },
    }),
};

export default apiService;
