export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem("curridata_token");

    // ✅ login 頁不需要擋
    if (to.path === "/login") return;

    if (!token) {
      return navigateTo("/login");
    }
  }
});
