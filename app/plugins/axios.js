// plugins/axios.js
import axios from "axios";

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: "https://curridata-server-pg.onrender.com",
    timeout: 10000,
  });

  return {
    provide: {
      curridataAPI: api,
    },
  };
});
