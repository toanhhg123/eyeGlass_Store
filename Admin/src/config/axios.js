import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5151",
});

api.interceptors.request.use(
  (config) => {
    let token = null;
    try {
      token = JSON.parse(localStorage.getItem("authenticated"))?.data?.token;
    } catch (error) {}
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (config) => config,
  (error) => {
    const message = error?.response?.data?.message || error.message;
    throw new Error(message);
  },
);

export default api;
