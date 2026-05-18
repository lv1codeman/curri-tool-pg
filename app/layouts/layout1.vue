<template>
  <v-app v-if="ready">
    <!-- ✅ header -->
    <v-app-bar app>
      <v-app-bar-nav-icon v-if="mobile" @click="drawer = !drawer" />

      <NuxtLink to="/">
        <v-app-bar-title class="pl-4">課務輔助工具</v-app-bar-title>
      </NuxtLink>

      <v-spacer />

      <div class="d-flex align-center pr-4">
        <template v-if="isLoggedIn">
          <span class="mr-3 text-subtitle-1 font-weight-bold">
            歡迎，{{ user?.name }} ({{ user?.username }})
          </span>

          <v-btn
            prepend-icon="mdi-logout"
            color="error"
            variant="tonal"
            @click="logout"
          >
            登出
          </v-btn>
        </template>

        <template v-else>
          <v-btn
            prepend-icon="mdi-login"
            color="primary"
            @click="navigateTo('/login')"
          >
            登入系統
          </v-btn>
        </template>
      </div>
    </v-app-bar>

    <!-- ✅ Sidebar -->
    <v-navigation-drawer
      v-if="isLoggedIn"
      v-model="drawer"
      app
      :permanent="!mobile"
      :temporary="mobile"
    >
      <v-list>
        <template v-for="item in menu" :key="item.title">
          <!-- ✅ 單層 -->

          <template v-if="!item.group && hasRole(item)">
            <v-list-item
              :to="item.path"
              :title="item.title"
              :prepend-icon="item.icon"
              @click="handleNavClick"
            />
          </template>

          <!-- ✅ group -->
          <v-list-group
            v-else-if="item.group && hasRole(item)"
            :value="item.title"
          >
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="item.title"
                :prepend-icon="item.icon"
              />
            </template>

            <!-- ✅ 🔥 修正 child 型別 -->
            <template v-for="child in getChildren(item)" :key="child.title">
              <v-list-item
                v-if="hasRole(child)"
                :to="child.path"
                :title="child.title"
                :prepend-icon="child.icon || 'mdi-chevron-right'"
                @click="handleNavClick"
              />
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- ✅ 主畫面 -->
    <v-main v-if="isLoggedIn">
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <!-- ✅ 未登入 -->
    <v-main v-else class="d-flex justify-center align-center">
      <v-card class="pa-6 text-center">
        <v-icon size="50">mdi-lock</v-icon>
        <h3>需要登入</h3>
        <v-btn class="mt-4" @click="navigateTo('/login')">登入</v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useDisplay } from "vuetify";
import { navigateTo } from "#app";
import { useUser } from "~/composables/useUser";
import { useMenu } from "~/composables/useMenu";
import type { MenuItem } from "~/composables/useMenu";

/* ✅ store */
const { user, clearUser, initUser } = useUser();
const { menu } = useMenu();

const ready = ref(false);

onMounted(() => {
  initUser();
  ready.value = true;
});

if (process.client && !user.value) {
  initUser();
}

const role = computed(() => user.value?.auth);
const isLoggedIn = computed(() => !!user.value);

/* ✅ ✅ ✅ 🔥 型別安全child */
const getChildren = (item: MenuItem): MenuItem[] => {
  return item.children || [];
};

/* ✅ 權限判斷 */
const hasRole = (item: MenuItem): boolean => {
  return item.roles.includes(role.value || "");
};

/* ✅ responsive */
const { mobile } = useDisplay();
const drawer = ref(false);

watch(
  mobile,
  (val) => {
    drawer.value = !val;
  },
  { immediate: true }
);

/* ✅ UX */
const handleNavClick = () => {
  if (mobile.value) drawer.value = false;
};

/* ✅ logout */
const logout = () => {
  clearUser();
  navigateTo("/login");
};
</script>
<style scoped>
.v-app-bar a {
  text-decoration: none;
  color: inherit;
}
</style>
