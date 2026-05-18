export default defineNuxtRouteMiddleware((to) => {
  const { user, token, initUser } = useUser();
  const { canAccess } = useRBAC();

  /* ✅ ✅ ✅ 🔥 SSR 不要判斷任何登入 */
  if (!process.client) return;

  /* ✅ ✅ ✅ 🔥 初始化 user（同步） */
  initUser();

  /* ✅ ✅ ✅ login 防回 */
  if (to.path === "/login") {
    if (token.value && user.value) {
      return navigateTo("/welcome");
    }
    return;
  }

  /* ✅ ✅ ✅ 公開頁 */
  if (to.path.startsWith("/Info") || to.path === "/403") {
    return;
  }

  /* ✅ ✅ ✅ 🔥 未登入立即跳 */
  if (!token.value || !user.value) {
    return navigateTo("/login");
  }

  /* ✅ RBAC */
  const role = user.value.auth;

  if (role === "admin") return;

  if (!canAccess(role, to.path)) {
    return navigateTo("/403");
  }
});
