<template>
  <v-app>
    <!-- ✅ 上方工具列 -->
    <v-app-bar app>
      <!-- ✅ 手機 menu 按鈕 -->
      <v-app-bar-nav-icon v-if="mobile" @click="drawer = !drawer" />

      <NuxtLink to="/">
        <v-app-bar-title class="pl-4">課務輔助工具</v-app-bar-title>
      </NuxtLink>

      <v-spacer />

      <!-- ✅ 使用者區 -->
      <div class="d-flex align-center pr-4">
        <template v-if="isLoggedIn">
          <span class="mr-3 text-subtitle-1 font-weight-bold">
            歡迎，{{ user?.name }} ({{ user?.username }})
          </span>

          <v-btn
            prepend-icon="mdi-logout"
            color="error"
            variant="flat"
            @click="logout"
          >
            登出
          </v-btn>
        </template>

        <template v-else>
          <v-btn
            prepend-icon="mdi-login"
            color="primary"
            @click="dialog = true"
          >
            登入系統
          </v-btn>
        </template>
      </div>
    </v-app-bar>

    <!-- ✅ Sidebar -->
    <div v-show="isLoggedIn">
      <v-navigation-drawer
        v-model="drawer"
        app
        :permanent="!mobile"
        :rail="!mobile"
        :expand-on-hover="!mobile"
        :temporary="mobile"
        color="grey-lighten-4"
      >
        <v-list nav density="comfortable">
          <!-- ✅ 主頁 -->
          <v-list-item
            to="/welcome"
            link
            prepend-icon="mdi-home"
            title="首頁"
            @click="handleNavClick"
          />

          <!-- ✅ 資訊 -->
          <v-list-item
            to="/Info/Info"
            link
            prepend-icon="mdi-information-outline"
            title="資訊速查"
            @click="handleNavClick"
          />

          <!-- ✅ 資料庫維護 -->
          <v-list-group value="db">
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-database-cog"
                title="資料庫維護"
                color="blue-grey"
              />
            </template>

            <v-list-item
              to="/DB/DBmaintain"
              link
              title="系所表維護"
              prepend-icon="mdi-table"
              @click="handleNavClick"
            />

            <v-list-item
              to="/DB/ClassDeptshort"
              link
              title="班級對應"
              prepend-icon="mdi-compare-horizontal"
              @click="handleNavClick"
            />

            <v-list-item
              to="/DB/CurriAgent"
              link
              title="課務承辦"
              prepend-icon="mdi-account-tie"
              @click="handleNavClick"
            />
          </v-list-group>

          <!-- ✅ 課務工具 -->
          <v-list-group value="tools">
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-toolbox-outline"
                title="課務工具"
                color="indigo"
              />
            </template>

            <v-list-item
              to="/Converters/ClassToOthers"
              link
              title="班級轉換"
              prepend-icon="mdi-file-swap"
              @click="handleNavClick"
            />

            <v-list-item
              to="/Converters/SIDtoSYS"
              link
              title="學制轉換"
              prepend-icon="mdi-file-refresh"
              @click="handleNavClick"
            />
            <v-list-item
              to="/Converters/CopyDeptsDetails"
              link
              title="email複製"
              prepend-icon="mdi-email-multiple-outline"
              @click="handleNavClick"
            />
          </v-list-group>

          <!-- ✅ 管理工具 -->
          <v-list-group v-if="isAdmin" value="admin">
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-shield-crown"
                title="管理工具"
                color="deep-purple"
              />
            </template>

            <v-list-item
              to="/Tools/Meme"
              link
              title="梗圖搜尋"
              prepend-icon="mdi-image-search"
              @click="handleNavClick"
            />

            <v-list-item
              to="/Tools/YTconverter"
              link
              title="YT下載"
              prepend-icon="mdi-download"
              @click="handleNavClick"
            />
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </div>
    <!-- ✅ 主畫面 -->
    <v-main v-if="isLoggedIn">
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <!-- ✅ 未登入 -->
    <v-main v-else class="d-flex align-center justify-center">
      <v-card class="pa-6 text-center" max-width="400">
        <v-icon size="50" color="warning">mdi-lock</v-icon>
        <h3 class="mt-2">需要登入</h3>
        <v-btn class="mt-4" @click="dialog = true">登入</v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useNuxtApp, navigateTo } from "#app";
import { useDisplay } from "vuetify";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const isDBActive = computed(() => route.path.startsWith("/DB"));

/* ------------------ ✅ responsive ------------------ */
const { mobile } = useDisplay();
const drawer = ref(false); // 🔥 不要預設 true

// ✅ 🔥 關鍵：讓 drawer 跟 mobile 同步（解你那個 bug）
watch(
  mobile,
  (val) => {
    drawer.value = !val; // 桌機開、手機關
  },
  { immediate: true }
);

/* ------------------ ✅ user ------------------ */
const user = ref<any>(null);
const dialog = ref(false);
const username = ref("");
const password = ref("");
const loginError = ref("");

const isLoggedIn = computed(() => !!user.value);
const isAdmin = computed(() => user.value?.auth === "admin");

const { $curridataAPI } = useNuxtApp();

/* ------------------ ✅ 初始化 ------------------ */
onMounted(() => {
  const storedUser = localStorage.getItem("curridata_user");

  if (storedUser) {
    user.value = JSON.parse(storedUser);

    // ✅ 🔥 補一刀，確保登入後開啟
    drawer.value = !mobile.value;
  }
});

/* ------------------ ✅ UX ------------------ */
const handleNavClick = () => {
  if (mobile.value) drawer.value = false;
};

/* ------------------ ✅ login ------------------ */
async function login() {
  try {
    const res = await $curridataAPI.post("/api/user_login", {
      username: username.value,
      password: password.value,
    });

    const userData = res.data.user;

    user.value = {
      name: userData.name,
      username: username.value,
      auth: userData.auth,
    };

    localStorage.setItem("curridata_user", JSON.stringify(user.value));
    localStorage.setItem("curridata_token", res.data.access_token);

    dialog.value = false;

    // ✅ 🔥 重點：登入後立刻開 sidebar
    drawer.value = !mobile.value;

    navigateTo("/welcome");
  } catch {
    loginError.value = "登入失敗";
  }
}

/* ------------------ ✅ logout ------------------ */
function logout() {
  user.value = null;
  localStorage.removeItem("curridata_user");
  localStorage.removeItem("curridata_token");

  drawer.value = false;

  navigateTo("/login");
}
</script>

<style scoped>
.v-app-bar a {
  text-decoration: none;
  color: inherit;
}
</style>
