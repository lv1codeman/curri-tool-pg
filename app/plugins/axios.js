import axios from "axios";
import { useUser } from "~/composables/useUser";

export default defineNuxtPlugin((nuxtApp) => {
  // const baseURL = process.dev
  //   ? "http://127.0.0.1:8000"
  //   : "https://curridata-server-pg.onrender.com";
  // const baseURL = "https://curridata-server-pg.onrender.com";
  const baseURL = "https://curridata-server-pg.vercel.app/";
  const api = axios.create({
    baseURL,
  });

  /* ✅ ✅ ✅ request：自動帶 token（改用 store） */
  api.interceptors.request.use((config) => {
    const { token, initUser } = useUser();

    // ✅ 確保 refresh 後 store 有值
    if (process.client && !token.value) {
      initUser();
    }

    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }

    return config;
  });

  /* ✅ ✅ ✅ response：處理 token 過期 */
  api.interceptors.response.use(
    (response) => response,

    (error) => {
      const status = error.response?.status;

      if (status === 403) {
        console.log("🔒 Token expired → logout");

        const { clearUser } = useUser();

        // ✅ 清 store（會同步 localStorage）
        clearUser();

        // ✅ 使用 Nuxt 導頁（不要用 window.location）
        return navigateTo("/login");
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
