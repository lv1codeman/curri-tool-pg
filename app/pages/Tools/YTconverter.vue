<script setup>
import { ref, computed } from "vue";
import { useNuxtApp } from "#app";
import { useRuntimeConfig } from "#app";

//套用layout
definePageMeta({
  layout: "layout1",
});
// =================================================================
// 【🔥 關鍵修改區】
// 🚨 您必須將此 Base URL 替換為您當前 ngrok 提供的公網地址！
// 🚨 這是唯一能確保瀏覽器向正確的伺服器（FastAPI）發出下載請求的修改。
// =================================================================
const config = useRuntimeConfig();
const BASE_DOWNLOAD_URL = config.public.apiBaseUrl;

// =================================================================
// 狀態管理：新增非同步任務追蹤狀態
// =================================================================
const url = ref("");
const format = ref("mp3");
const error = ref("");
const message = ref("");

// 非同步狀態追蹤
const jobId = ref(null);
// 狀態：IDLE, PENDING, DOWNLOADING, COMPLETED, FAILED, ERROR
const status = ref("IDLE");
const progress = ref(0); // 0-100
const pollingInterval = ref(null);

const POLLING_INTERVAL_MS = 2000; // 每 2 秒輪詢一次

// 假設 $curridataAPI 已經被注入 (如 Nuxt 環境)
const { $curridataAPI } = useNuxtApp();

/**
 * 計算屬性：根據狀態動態調整 Vuetify 的顏色
 */
const statusColor = computed(function () {
  return status.value === "PENDING" || status.value === "DOWNLOADING"
    ? "primary"
    : status.value === "COMPLETED"
    ? "success"
    : status.value === "FAILED" || status.value === "ERROR"
    ? "error"
    : "grey";
});

/**
 * 計算屬性：根據狀態動態調整顯示的文字
 */
const statusText = computed(function () {
  return status.value === "PENDING"
    ? "等待伺服器處理..."
    : status.value === "DOWNLOADING"
    ? `下載中... (${progress.value.toFixed(1)}%)`
    : status.value === "COMPLETED"
    ? "下載完成！"
    : status.value === "FAILED"
    ? "任務失敗！"
    : status.value === "ERROR"
    ? "連線/輪詢錯誤"
    : "準備就緒";
});

/**
 * 計算屬性：判斷目前是否處於正在處理的狀態
 */
const isProcessing = computed(function () {
  return status.value === "PENDING" || status.value === "DOWNLOADING";
});

// =================================================================
// 核心邏輯：三步驟非同步處理
// =================================================================

/**
 * 步驟 1: 處理下載請求 (提交任務)
 */
const downloadMedia = async function () {
  // 重置狀態
  error.value = "";
  message.value = "";
  stopPolling();

  // 基礎驗證
  if (!url.value.trim() || !url.value.startsWith("http")) {
    error.value = "請輸入有效的 YouTube 網址，並確保它以 http 或 https 開頭。";
    return;
  }

  // 設定初始狀態
  status.value = "PENDING";
  progress.value = 0;
  jobId.value = null;
  message.value = "正在提交下載任務...";

  try {
    const gopost = JSON.stringify({ url: url.value, format: format.value });

    // 從 response.data 中取出實際資料
    // 假設 $curridataAPI 已經正確設定了 BASE_URL 為 ngrok 地址，因此這些 API 呼叫是正確的
    const response = await $curridataAPI.post("submit_download_job", gopost);
    const data = response.data;

    // 彈性檢查 job ID
    let receivedJobId = data.job_id || data.id || data.taskId;

    if (!receivedJobId) {
      if (data.error || data.message) {
        throw new Error(`伺服器回傳錯誤: ${data.error || data.message}`);
      }
      throw new Error(
        `伺服器回傳格式錯誤，找不到 job_id、id 或 taskId。實際回傳資料：${JSON.stringify(
          response
        )}`
      );
    }

    jobId.value = receivedJobId;
    message.value = `任務已成功提交，Job ID: ${jobId.value}。開始追蹤進度...`;

    // 步驟 2: 啟動輪詢
    startPolling();
  } catch (err) {
    // 提交任務失敗處理
    console.error("提交任務失敗:", err);
    let errorMessage =
      err.message ||
      (typeof err === "object" && err !== null
        ? JSON.stringify(err)
        : String(err));
    error.value = `提交任務失敗：${errorMessage}`;
    status.value = "FAILED";
  }
};

/**
 * 步驟 2a: 啟動輪詢循環
 */
const startPolling = function () {
  stopPolling(); // 清除舊的計時器
  checkStatus(); // 立即檢查一次狀態
  pollingInterval.value = setInterval(checkStatus, POLLING_INTERVAL_MS);
};

/**
 * 步驟 2b: 停止輪詢
 */
const stopPolling = function () {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value);
    pollingInterval.value = null;
  }
};

/**
 * 步驟 2c: 檢查狀態並更新 UI
 */
const checkStatus = async function () {
  if (!jobId.value) {
    stopPolling();
    return;
  }

  try {
    // 從 response.data 中取出實際資料
    const response = await $curridataAPI.get(`download_status/${jobId.value}`);
    const data = response.data;

    // 成功路徑，直接使用 data
    if (!data.status) {
      throw new Error("伺服器回傳狀態格式錯誤。");
    }

    // 更新狀態和進度
    status.value = data.status;
    progress.value = data.progress || 0;

    if (status.value === "COMPLETED") {
      stopPolling();
      message.value = `✅ 下載完成 (100%)！檔案已在伺服器準備完畢。正在啟動下載...`;
      // 步驟 3: 觸發最終下載
      triggerDownload();
    } else if (status.value === "DOWNLOADING") {
      message.value = `下載中，進度更新至 ${progress.value.toFixed(1)}%...`;
    } else if (status.value === "FAILED") {
      stopPolling();
      error.value = `❌ 任務處理失敗。請檢查網址或伺服器日誌。`;
    }
  } catch (err) {
    // 輪詢失敗，可能是網路錯誤或伺服器回傳 4xx/5xx
    console.error("輪詢錯誤:", err);
    stopPolling();
    status.value = "ERROR";
    let errorMessage =
      err.message ||
      (typeof err === "object" && err !== null
        ? JSON.stringify(err)
        : String(err));
    error.value = `輪詢狀態錯誤：${errorMessage}`;
  }
};

/**
 * 步驟 3: 觸發最終下載 (使用動態 <a> 標籤，解決頁面導向問題)
 * * 假設伺服器在 /download_file/{jobId} 依然回傳正確的 Content-Disposition 標頭。
 */
const triggerDownload = function () {
  if (jobId.value && status.value === "COMPLETED") {
    // 1. 構建下載 URL - 【修改此處】使用 BASE_DOWNLOAD_URL 確保指向 ngrok
    const downloadUrl = `${BASE_DOWNLOAD_URL}/download_file/${jobId.value}`;

    // 2. 建立隱藏的 <a> 標籤
    const link = document.createElement("a");
    link.href = downloadUrl;

    // 3. 設定 download 屬性，強制瀏覽器彈出「儲存檔案」對話框，並建議檔名
    // 建議的檔名應包含 Job ID 和格式，方便識別
    link.setAttribute(
      "download",
      `media_download_${jobId.value}.${format.value}`
    );
    link.style.display = "none"; // 隱藏連結

    // 4. 附加到 body, 模擬點擊, 移除
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.value = `🎉 檔案下載已開始。瀏覽器將提示您儲存位置。`;

    // 下載鏈接啟動後，重置狀態，允許再次提交
    // 這裡延遲 3 秒讓下載開始後，再重置UI
    setTimeout(function () {
      status.value = "IDLE";
      progress.value = 0;
      jobId.value = null;
    }, 3000);
  }
};

// 供按鈕點擊使用，只有在 IDLE/FAILED/ERROR 狀態下才允許重新開始
const handleSubmit = function () {
  if (
    status.value === "IDLE" ||
    status.value === "FAILED" ||
    status.value === "ERROR"
  ) {
    downloadMedia();
  }
};
</script>

<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center" align="start">
        <v-col cols="12" sm="10" md="8" lg="6" xl="5">
          <v-card class="pa-4 pa-sm-8" elevation="12" rounded="xl">
            <v-card-title
              class="text-h4 text-sm-h3 text-center font-weight-bold mb-4"
            >
              YouTube下載器
            </v-card-title>
            <v-card-subtitle class="text-center mb-6">
              <p>輸入 YouTube 網址，選擇格式，伺服器將在背景處理任務。</p>
              <p>例如：https://www.youtube.com/watch?v=JfYbYIv2-tY</p>
            </v-card-subtitle>

            <!-- 狀態訊息區 (v-alert) -->
            <v-alert
              v-if="error"
              type="error"
              closable
              icon="mdi-alert-circle"
              variant="tonal"
              class="mb-4"
              @update:modelValue="error = ''"
            >
              <div class="font-weight-medium">錯誤:</div>
              {{ error }}
            </v-alert>
            <!-- 資訊/處理中訊息 -->
            <v-alert
              v-if="message && status !== 'COMPLETED'"
              type="info"
              icon="mdi-information-outline"
              variant="tonal"
              class="mb-4"
            >
              <div class="font-weight-medium">狀態:</div>
              {{ message }}
            </v-alert>
            <!-- 完成訊息 -->
            <v-alert
              v-if="status === 'COMPLETED'"
              type="success"
              icon="mdi-check-all"
              variant="tonal"
              class="mb-4"
              @update:modelValue="message = ''"
            >
              <div class="font-weight-medium">下載已完成!</div>
              {{ message }}
            </v-alert>

            <!-- 輸入網址 (v-text-field) -->
            <v-text-field
              v-model="url"
              label="YouTube 影片網址"
              placeholder="例如: https://www.youtube.com/watch?v=..."
              variant="outlined"
              :disabled="isProcessing"
              :rules="[(v) => !!v || '網址不能為空']"
              prepend-inner-icon="mdi-link-variant"
              clearable
              class="mb-6"
            ></v-text-field>

            <!-- 選擇格式 (v-radio-group) -->
            <v-radio-group
              v-model="format"
              label="選擇輸出格式"
              inline
              :disabled="isProcessing"
              class="mb-8"
            >
              <v-radio
                label="MP3 (音訊)"
                value="mp3"
                color="primary"
                icon="mdi-music-box"
                class="mr-4"
              ></v-radio>
              <v-radio
                label="MP4 (影片)"
                value="mp4"
                color="primary"
                icon="mdi-video"
                class="mr-4"
              ></v-radio>
            </v-radio-group>

            <!-- 新增: 任務狀態與進度條 -->
            <v-card
              v-if="jobId"
              :loading="isProcessing"
              :color="statusColor"
              variant="tonal"
              class="mb-6 pa-4"
            >
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="text-subtitle-1 font-weight-medium">任務 ID:</span>
                <v-chip :color="statusColor" variant="flat" size="small">{{
                  jobId
                }}</v-chip>
              </div>

              <div class="d-flex justify-space-between align-center mb-4">
                <span class="text-subtitle-1 font-weight-medium"
                  >目前狀態:</span
                >
                <v-chip :color="statusColor" variant="outlined" size="default">
                  {{ statusText }}
                </v-chip>
              </div>

              <v-progress-linear
                v-model="progress"
                :color="statusColor"
                height="16"
                rounded
                striped
                class="my-2"
              >
                <template v-slot:default="{ value }">
                  <span class="text-white font-weight-bold text-caption">
                    {{ value.toFixed(1) }}%
                  </span>
                </template>
              </v-progress-linear>
            </v-card>

            <!-- 下載按鈕 (v-btn) -->
            <v-btn
              @click="handleSubmit"
              :loading="isProcessing"
              :disabled="isProcessing"
              :color="isProcessing ? 'primary' : 'success'"
              size="x-large"
              block
              elevation="8"
              rounded="lg"
              class="text-button"
            >
              <!-- 根據狀態切換按鈕文字 -->
              <span
                v-if="
                  status === 'IDLE' || status === 'FAILED' || status === 'ERROR'
                "
                >開始下載</span
              >
              <span v-else-if="status === 'COMPLETED'"
                >下載完成 (點擊即可重新提交)</span
              >
              <span v-else-if="status === 'PENDING'">提交中...</span>
              <span v-else-if="status === 'DOWNLOADING'">{{ statusText }}</span>

              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon icon="mdi-cached" class="spin-icon"></v-icon>
                  處理中...
                </span>
              </template>
            </v-btn>

            <!-- 備註 -->
            <v-card-text
              class="text-caption text-center mt-6 text-grey-darken-1"
            >
              **備註:**
              <span v-if="isProcessing"
                >伺服器正在背景處理您的請求。請不要關閉頁面。</span
              >
              <span v-else>下載時間取決於伺服器處理速度與檔案大小。</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
/* 保持原有的旋轉動畫樣式 */
.custom-loader .spin-icon {
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.text-button {
  letter-spacing: 0.1em;
}
</style>
