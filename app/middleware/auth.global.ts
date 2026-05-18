export default defineNuxtRouteMiddleware((to) => {
  const { user, token, initUser } = useUser();
  const { canAccess } = useRBAC();

  if (!process.client) return;

  initUser();

  if (to.path === "/" || to.path === "/login") {
    if (token.value && user.value) {
      return navigateTo("/welcome");
    }
    return;
  }

  if (to.path.startsWith("/Info") || to.path === "/403") {
    return;
  }

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
