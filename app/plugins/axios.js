import axios from "axios";

export default defineNuxtPlugin(() => {
  const baseURL = process.dev
    ? "http://127.0.0.1:8000" //dev
    : "https://curridata-server-pg.onrender.com"; //deploy

  const api = axios.create({
    baseURL,
  });
  // request攜帶token
  api.interceptors.request.use((config) => {
    if (process.client) {
      const token = localStorage.getItem("curridata_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });
  // 若收到403代表token過期，引導到login.vue
  api.interceptors.response.use(
    (response) => response,

    (error) => {
      if (error.response && error.response.status === 403) {
        console.log("🔒 Token expired → logout");
        localStorage.removeItem("curridata_token");
        localStorage.removeItem("curridata_user");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );

  return {
    provide: {
      curridataAPI: api,
    },
  };
});
