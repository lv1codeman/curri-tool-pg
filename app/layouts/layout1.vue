<template>
  <v-app>
    <v-app-bar app>
      <NuxtLink to="/">
        <v-app-bar-title class="pl-4">課務輔助工具</v-app-bar-title>
      </NuxtLink>

      <v-spacer></v-spacer>

      <div class="d-flex align-center pr-4">
        <template v-if="isLoggedIn">
          <div v-if="user">
            <span class="mr-3 text-subtitle-1 font-weight-bold">
              歡迎，{{ user.name }} ({{ user.username }})
            </span>
          </div>

          <div v-else>
            <span>請先登入</span>
          </div>

          <v-btn
            prepend-icon="mdi-logout"
            color="error"
            variant="flat"
            @click="logout"
            size="large"
          >
            登出
          </v-btn>
        </template>

        <template v-else>
          <v-btn
            prepend-icon="mdi-login"
            color="primary"
            variant="flat"
            @click="dialog = true"
            size="large"
          >
            登入系統
          </v-btn>
        </template>
      </div>
    </v-app-bar>

    <v-navigation-drawer expand-on-hover permanent rail app v-if="isLoggedIn">
      <v-list nav>
        <v-list-item
          title="公告消息"
          link
          to="/welcome"
          prepend-icon="mdi-home-outline"
        ></v-list-item>
        <v-list-item
          title="資訊速查"
          link
          to="/Info/Info"
          prepend-icon="mdi-information"
        ></v-list-item>
        <v-list-group value="database_maintenance">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-database-cog"
              title="資料庫維護"
            ></v-list-item>
          </template>
          <v-list-item
            title="系所表維護"
            link
            to="/DB/DBmaintain"
            prepend-icon="mdi-table-edit"
          ></v-list-item>
          <v-tooltip text="班級-系所簡稱對照表維護" location="end">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                title="班級-系所簡稱對照表維護"
                link
                to="/DB/ClassDeptshort"
                prepend-icon="mdi-compare-horizontal"
              ></v-list-item>
            </template>
          </v-tooltip>
          <v-list-item
            title="課務承辦維護"
            link
            to="/DB/CurriAgent"
            prepend-icon="mdi-account-edit"
          ></v-list-item>
        </v-list-group>
        <v-list-group value="curriculum_tools">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-toolbox"
              title="課務工具"
            ></v-list-item>
          </template>
          <v-list-item
            title="班級簡稱轉換"
            link
            to="/Converters/ClassToOthers"
            prepend-icon="mdi-file-swap"
          ></v-list-item>
          <v-list-item
            title="學制轉換"
            link
            to="/Converters/SIDtoSYS"
            prepend-icon="mdi-file-swap"
          ></v-list-item>
        </v-list-group>
        <v-list-group value="tools" v-if="isAdmin">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-tools"
              title="其他工具"
            ></v-list-item>
          </template>
          <v-list-item
            title="梗圖搜尋"
            link
            to="/Tools/Meme"
            prepend-icon="mdi-image"
          ></v-list-item>
          <v-list-item
            title="Youtube影片下載"
            link
            to="/Tools/YTconverter"
            prepend-icon="mdi-download-box"
          ></v-list-item>
        </v-list-group>
        <v-list-group value="sixer" v-if="isAdmin">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-star-circle-outline"
              title="Sixer"
            ></v-list-item>
          </template>

          <v-list-item
            title="Minecraft"
            link
            to="/Sixer/Minecraft"
            prepend-icon="mdi-download-box"
          ></v-list-item>
          <v-list-item
            title="存檔更新"
            link
            to="/Sixer/Upload"
            prepend-icon="mdi-download-box"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex justify-center mt-2"
      :class="{ 'ml-0': !isLoggedIn }"
      v-if="isLoggedIn"
    >
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <v-main v-else class="d-flex align-center justify-center">
      <v-card class="text-center pa-10" elevation="5" max-width="500">
        <v-icon color="warning" size="60" class="mb-4">mdi-lock-alert</v-icon>
        <v-card-title class="text-h5">需要登入</v-card-title>
        <v-card-text class="text-subtitle-1">
          請點擊右上角「登入系統」以存取課務輔助工具。
        </v-card-text>
        <v-btn
          color="primary"
          variant="flat"
          class="mt-4"
          @click="dialog = true"
        >
          前往登入
        </v-btn>
      </v-card>
    </v-main>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5 primary lighten-2">
          使用者登入
        </v-card-title>
        <v-card-text class="pt-4">
          <v-alert
            v-if="loginError"
            type="error"
            density="compact"
            class="mb-3"
            >{{ loginError }}</v-alert
          >
          <v-text-field
            v-model="username"
            label="帳號 (ACCOUNT)"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            density="compact"
            :disabled="isLoggingIn"
            required
            @keyup.enter="login"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="密碼 (PWD)"
            type="password"
            prepend-inner-icon="mdi-lock"
            variant="outlined"
            density="compact"
            :disabled="isLoggingIn"
            required
            @keyup.enter="login"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            color="error"
            variant="text"
            @click="dialog = false"
            :disabled="isLoggingIn"
          >
            取消
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            :loading="isLoggingIn"
            @click="login"
            :disabled="!username || !password"
          >
            確認登入
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"; // 🎯 引入 onMounted
import { useNuxtApp } from "#app";
import { navigateTo } from "#app";
import axios from "axios";

// 假設您的 axios 實例名稱為 $curridataAPI
const { $curridataAPI } = useNuxtApp();

// -----------------------------------------------------------------
// 🎯 登入狀態管理
// -----------------------------------------------------------------

// 儲存登入的使用者資訊，包含 name (顯示名稱)、username (登入帳號) 和 auth (權限)
const user = ref<{
  name: string;
  username: string;
  auth: number | string;
} | null>(null);
const dialog = ref(false);
const username = ref("");
const password = ref("");
const isLoggingIn = ref(false);
const loginError = ref("");

const isLoggedIn = computed(() => !!user.value);

const isAdmin = computed(() => {
  // 只有在 user 存在且 user.auth 嚴格等於 'admin' 時，視為管理員
  return user.value && user.value.auth === "admin";
});

const isCurri = computed(() => {
  // 只有在 user 存在且 user.auth 嚴格等於 'curri' 時，視為課務組員
  return user.value && user.value.auth === "curri";
});

// -----------------------------------------------------------------
// 🎯 狀態持久化：讀取 localStorage (在伺服器端渲染之後執行)
// -----------------------------------------------------------------

onMounted(() => {
  // 檢查瀏覽器是否支援 localStorage
  if (typeof localStorage !== "undefined") {
    const storedUser = localStorage.getItem("curridata_user");
    if (storedUser) {
      try {
        // 讀取並設置 user 狀態
        user.value = JSON.parse(storedUser);
      } catch (e) {
        console.error("解析 localStorage 使用者狀態失敗:", e);
        // 如果解析失敗，則清除舊的錯誤資料
        localStorage.removeItem("curridata_user");
      }
    }
  }
});

/**
 * 處理登入請求：呼叫後端 /api/user_login 接口進行驗證
 */
async function login() {
  if (!username.value || !password.value) {
    loginError.value = "請輸入完整的帳號和密碼。";
    return;
  }

  isLoggingIn.value = true;
  loginError.value = "";

  try {
    const response = await $curridataAPI.post("/api/user_login", {
      username: username.value,
      password: password.value,
    });

    // 成功登入：儲存回傳的 NAME 和 AUTH
    const userData = {
      name: response.data.user.name,
      auth: response.data.user.auth,
      username: response.data.user.username,
    };
    user.value = userData;
    dialog.value = false;

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("curridata_user", JSON.stringify(userData));
    }

    password.value = "";
    navigateTo("/welcome", { replace: true });
  } catch (error) {
    // 🎯 使用 axios.isAxiosError 解決 TypeScript 'unknown' 錯誤
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        // 情況 A：後端明確回傳 401 (帳密錯誤)
        loginError.value =
          error.response?.data?.detail || "帳號或密碼錯誤，請重新輸入。";
      } else if (!error.response) {
        // 情況 B：完全沒收到回應 (網路斷線或伺服器當機)
        loginError.value = "無法連線至伺服器，請檢查網路連線。";
      } else {
        // 情況 C：其他 HTTP 錯誤 (如 500, 404 等)
        loginError.value = `伺服器回應異常 (${status})，請稍後再試。`;
      }
      console.error("Axios 登入錯誤:", error.response?.data || error.message);
    } else {
      // 情況 D：非 Axios 產生的錯誤 (例如程式碼邏輯噴錯)
      console.error("非 API 錯誤:", error);
      loginError.value = "系統發生未知錯誤。";
    }

    // 登入失敗處理
    user.value = null;
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("curridata_user");
    }
  } finally {
    isLoggingIn.value = false;
  }
}

/**
 * 處理登出
 */
function logout() {
  user.value = null; // 清除使用者狀態

  // 🎯 關鍵修改：從 localStorage 移除使用者資訊
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("curridata_user");
    localStorage.removeItem("curridata_token");
  }
  navigateTo("/login");
  alert("您已登出。");

  // 登出後導向首頁
  navigateTo("/", { replace: true });
}
</script>

<style scoped>
.v-app-bar a {
  text-decoration: none;
  color: inherit;
}
/* 🎯 確保未登入時 v-main 佔據整個寬度，且內容不受 v-navigation-drawer 的邊距影響 */
.v-main:not(.ml-0) {
  /* 這裡需要覆蓋 Vuetify 預設為 v-main 加上導航列寬度的邊距 */
  margin-left: 0 !important;
}
</style>
