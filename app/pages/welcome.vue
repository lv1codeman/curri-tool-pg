<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="elevation-3">
          <v-card-text>
            <h1 class="text-h4 mb-2 d-flex align-center">
              <v-icon color="primary" size="36" class="mr-3"
                >mdi-office-building-cog</v-icon
              >
              課務輔助工具系統
            </h1>

            <p v-if="user" class="text-h6 text-grey-darken-2">
              歡迎回來，<span class="font-weight-bold text-primary">{{
                user.name
              }}</span
              >！
              <span class="text-subtitle-1 ml-2 text-medium-emphasis">
                (您的權限等級: {{ user.auth }})
              </span>
            </p>
            <v-divider class="my-3"></v-divider>
            <p class="text-subtitle-1">
              本系統旨在提供課務相關資料維護與轉換輔助功能，請使用左側選單進行操作。
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4 elevation-2">
          <v-card-title class="text-h6 d-flex align-center">
            <v-icon
              class="mr-2"
              :color="
                serverStatus === 'success'
                  ? 'success'
                  : serverStatus === 'error'
                  ? 'error'
                  : 'grey'
              "
            >
              {{
                serverStatus === "success"
                  ? "mdi-server-network"
                  : serverStatus === "error"
                  ? "mdi-server-network-off"
                  : "mdi-sync"
              }}
            </v-icon>
            伺服器狀態
          </v-card-title>
          <v-card-text>
            <v-alert
              :type="alertTypeMap[serverStatus]"
              density="compact"
              variant="tonal"
              :title="
                serverStatus === 'success'
                  ? '正常運行'
                  : serverStatus === 'error'
                  ? '連線失敗'
                  : '檢查中...'
              "
            >
              {{ serverMessage }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <v-card
          class="pa-4 quick-entry-card"
          elevation="3"
          link
          to="/Info/Info"
          color="blue-grey-lighten-5"
        >
          <v-list-item three-line>
            <v-list-item-title class="text-h6 mb-1">
              <v-icon color="blue-grey-darken-2" class="mr-2"
                >mdi-information</v-icon
              >
              資料速查
            </v-list-item-title>
            <v-list-item-subtitle> 課務相關資料速查 </v-list-item-subtitle>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <v-card
          class="pa-4 quick-entry-card"
          elevation="3"
          link
          to="/Converters/ClassToOthers"
          color="indigo-lighten-5"
        >
          <v-list-item three-line>
            <v-list-item-title class="text-h6 mb-1">
              <v-icon color="indigo-darken-2" class="mr-2"
                >mdi-file-swap</v-icon
              >
              班級簡稱轉換
            </v-list-item-title>
            <v-list-item-subtitle>
              快速轉換班級代碼至各種簡稱格式。
            </v-list-item-subtitle>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card
          class="pa-4 quick-entry-card"
          elevation="3"
          link
          to="/DB/CurriAgent"
          color="green-lighten-5"
        >
          <v-list-item three-line>
            <v-list-item-title class="text-h6 mb-1">
              <v-icon color="green-darken-2" class="mr-2"
                >mdi-account-edit</v-icon
              >
              課務承辦維護
            </v-list-item-title>
            <v-list-item-subtitle>
              維護各部門課務承辦人員的資訊。
            </v-list-item-subtitle>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card
          class="pa-4 quick-entry-card"
          elevation="3"
          link
          to="/Tools/YTconverter"
          color="orange-lighten-5"
        >
          <v-list-item three-line>
            <v-list-item-title class="text-h6 mb-1">
              <v-icon color="orange-darken-2" class="mr-2">mdi-tools</v-icon>
              其他工具
            </v-list-item-title>
            <v-list-item-subtitle>
              Youtube 影片下載及其他輔助功能。
            </v-list-item-subtitle>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4" v-if="user">
      <v-col cols="12" md="6">
        <v-card class="pa-4 elevation-2">
          <v-card-title class="text-h6 d-flex align-center">
            <v-icon class="mr-2" color="warning">mdi-bullhorn</v-icon>
            系統公告
          </v-card-title>
          <v-card-text>
            <v-alert type="info" density="compact" variant="tonal" class="mb-2">
              [2025-11-20] 資料庫連線已修復，登入服務正常運行。
            </v-alert>
            <v-alert type="success" density="compact" variant="tonal">
              系統更新：班級簡稱轉換工具新增批次處理模式。
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { definePageMeta, useNuxtApp } from "#imports"; // 🎯 引入 useNuxtApp

// 🎯 從 Nuxt App 中取出 $curridataAPI (您的 Axios/Fetch 實例)
const { $curridataAPI } = useNuxtApp();

definePageMeta({
  layout: "layout1",
});

const user = ref<{
  name: string;
  username: string;
  auth: number | string;
} | null>(null);

// 🎯 新增伺服器狀態的響應式變數

const alertTypeMap: Record<ServerStatus, "info" | "success" | "error"> = {
  loading: "info",
  success: "success",
  error: "error",
};

type ServerStatus = "loading" | "success" | "error";

const serverStatus = ref<ServerStatus>("loading");
const serverMessage = ref("正在檢查伺服器連線狀態...");

// -----------------------------------------------------------------
// 🎯 伺服器狀態檢查邏輯
// -----------------------------------------------------------------

async function checkServerStatus() {
  serverStatus.value = "loading";
  serverMessage.value = "正在檢查伺服器連線狀態...";

  try {
    // 呼叫您的測試 API 端點
    const response = await $curridataAPI.get("/get_test");

    // 假設成功時回傳 200 狀態碼
    if (response.status === 200) {
      serverStatus.value = "success";
      // 顯示後端回傳的訊息
      serverMessage.value = response.data || "伺服器端點連線正常。";
    } else {
      // 雖然成功連線，但回傳的狀態碼非 200
      serverStatus.value = "error";
      serverMessage.value = `連線成功，但伺服器回傳狀態碼 ${response.status}。`;
    }
  } catch (error) {
    // 捕獲網路錯誤、逾時或伺服器 5xx 錯誤
    console.error("伺服器連線測試失敗:", error);
    serverStatus.value = "error";
    serverMessage.value =
      "無法連線到伺服器 API 端點，請檢查網路或後端服務是否運行。";
  }
}

// -----------------------------------------------------------------
// 🎯 生命周期鉤子
// -----------------------------------------------------------------

onMounted(() => {
  // 1. 從 localStorage 讀取狀態
  if (typeof localStorage !== "undefined") {
    const storedUser = localStorage.getItem("curridata_user");
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser);
      } catch (e) {
        console.error("解析使用者狀態失敗", e);
      }
    }
  }

  // 2. 檢查伺服器狀態
  checkServerStatus();
});
</script>

<style scoped>
.quick-entry-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.quick-entry-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1) !important;
}
</style>
