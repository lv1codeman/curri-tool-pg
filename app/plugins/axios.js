import axios from "axios";

export default defineNuxtPlugin(() => {
  const baseURL = process.dev
    ? "http://127.0.0.1:8000"
    : "https://curridata-server-pg.onrender.com";

  const api = axios.create({
    baseURL,
  });

  api.interceptors.request.use((config) => {
    if (process.client) {
      const token = localStorage.getItem("curridata_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });

  return {
    provide: {
      curridataAPI: api,
    },
  };
});
