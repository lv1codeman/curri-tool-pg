<template>
  <v-card class="mx-auto pa-4" max-width="600" elevation="10">
    <v-card-title class="text-h5 mb-2">💾 Minecraft 存檔管理</v-card-title>
    <v-card-subtitle>目標目錄：C:\Users\admin\...\saves</v-card-subtitle>

    <v-card-text>
      <v-card-title class="text-h6 mb-2 mt-4 pa-0"
        >📥 下載伺服器存檔</v-card-title
      >
      <v-select
        v-model="selectedDownloadFile"
        :items="fileList"
        label="選擇要下載的存檔檔案 (包含副檔名)"
        hint="點擊右側按鈕重新整理清單"
        persistent-hint
        variant="outlined"
        density="compact"
        clearable
        :loading="isListing"
        :disabled="isListing"
        item-title="title"
        item-value="value"
      >
        <template v-slot:append-inner>
          <v-btn
            icon="mdi-refresh"
            variant="text"
            size="small"
            @click="fetchFileList"
            :loading="isListing"
            :disabled="isListing"
          ></v-btn>
        </template>
      </v-select>

      <v-divider class="my-4"></v-divider>

      <v-card-title class="text-h6 mb-2 pa-0">⬆️ 上傳新存檔</v-card-title>
      <v-file-input
        v-model="selectedFile"
        label="拖曳或點擊選擇存檔檔案 (.zip, 資料夾, .dat 等)"
        hint="同名檔案將在伺服器端被覆蓋"
        persistent-hint
        variant="outlined"
        density="compact"
        prepend-icon="mdi-cloud-upload"
        :show-size="true"
        counter
        chips
        clearable
        :disabled="isUploading"
      ></v-file-input>
    </v-card-text>

    <v-card-actions class="d-flex justify-space-between">
      <v-btn
        color="secondary"
        :disabled="!selectedDownloadFile"
        @click="downloadFile"
        prepend-icon="mdi-download"
        size="large"
        variant="tonal"
      >
        下載選定存檔
      </v-btn>

      <v-btn
        color="primary"
        :disabled="!selectedFile || isUploading"
        :loading="isUploading"
        @click="uploadFile"
        append-icon="mdi-content-save"
        size="large"
      >
        上傳並儲存存檔
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-snackbar
    v-model="snackbar"
    :timeout="3000"
    :color="snackbarColor"
    location="bottom right"
  >
    {{ snackbarText }}

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        關閉
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
definePageMeta({
  layout: "layout1",
});
import { ref, onMounted } from "vue"; // 🎯 新增 onMounted
import { useNuxtApp } from "#app";

const { $curridataAPI } = useNuxtApp();
const uploadUrl = "/api/upload-save";

// 1. 響應式狀態定義 (Upload 相關，保持不變)
const selectedFile = ref(null);
const isUploading = ref(false);
const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("success");

// 2. 響應式狀態定義 (Download 相關，新增)
const fileList = ref([]); // 伺服器檔案列表
const selectedDownloadFile = ref(null); // 選中要下載的檔案名
const isListing = ref(false); // 載入檔案列表的動畫狀態

// ----------------------------------------------------
// 🎯 下載功能邏輯
// ----------------------------------------------------

// A. 載入檔案列表
async function fetchFileList() {
  isListing.value = true;
  fileList.value = []; // 清空現有列表
  selectedDownloadFile.value = null;
  try {
    const response = await $curridataAPI.get("/api/list-saves");

    let rawFiles = response.data.files || [];

    // 🎯 關鍵修正：篩選掉資料夾
    // 假設資料夾名稱不包含 '.' 字符，或者 '.' 字符不在最後四個字符內 (即不是標準副檔名)
    const filteredFiles = rawFiles.filter((filename) => {
      // 檢查檔案名稱是否包含副檔名 (即包含 '.')
      return filename.includes(".");
    });

    fileList.value = filteredFiles; // 只顯示過濾後的檔案列表

    if (fileList.value.length === 0) {
      showSnackbar("伺服器存檔目錄中沒有可供下載的檔案。", "info");
    } else if (rawFiles.length !== filteredFiles.length) {
      // 如果原始列表和過濾列表數量不同，代表有資料夾被排除
      const excludedCount = rawFiles.length - filteredFiles.length;
      showSnackbar(
        `已成功排除 ${excludedCount} 個資料夾，僅顯示檔案。`,
        "success"
      );
    } else {
      showSnackbar(`✅ 成功載入 ${fileList.value.length} 個檔案。`, "success");
    }
  } catch (error) {
    console.error("獲取檔案列表失敗:", error);
    showSnackbar("❌ 無法載入存檔列表。", "error");
  } finally {
    isListing.value = false;
  }
}

// B. 執行下載操作
function downloadFile() {
  if (!selectedDownloadFile.value) return;

  // 由於我們使用 $curridataAPI，其 baseURL 已經設定好。
  // 我們需要從 Axios 實例中獲取 baseURL 來構建下載的完整 URL。
  const baseURL = $curridataAPI.defaults.baseURL || window.location.origin;

  // 必須對檔案名進行 URL 編碼，以處理中文、空格和特殊字元
  const encodedFilename = encodeURIComponent(selectedDownloadFile.value);

  // 構建完整的下載 URL
  const downloadUrl = `${baseURL}/api/download-save/${encodedFilename}`;

  // 使用原生的 <a> 標籤觸發下載，這是最穩定的方式
  const link = document.createElement("a");
  link.href = downloadUrl;
  // 設置 download 屬性可以為檔案提供建議名稱
  link.setAttribute("download", selectedDownloadFile.value);

  document.body.appendChild(link);
  link.click(); // 觸發瀏覽器下載
  document.body.removeChild(link);

  showSnackbar(
    `📥 正在下載：${selectedDownloadFile.value} (下載將在瀏覽器中開始)`,
    "info"
  );

  // 清空選擇
  selectedDownloadFile.value = null;
}

// ----------------------------------------------------
// 🎯 初始化和上傳邏輯 (上傳部分已修正)
// ----------------------------------------------------

// 在元件載入後執行一次，獲取檔案清單
onMounted(fetchFileList);

// 3. 上傳邏輯 (使用修正後的 Axios 處理方式)
async function uploadFile() {
  // ... (檔案獲取邏輯保持不變)
  if (!selectedFile.value) {
    showSnackbar("請先選擇一個檔案！", "warning");
    return;
  }

  isUploading.value = true;

  let fileToUpload = null;
  if (Array.isArray(selectedFile.value) && selectedFile.value.length > 0) {
    fileToUpload = selectedFile.value[0];
  } else if (selectedFile.value instanceof File) {
    fileToUpload = selectedFile.value;
  }

  // 最終驗證 fileToUpload
  if (!fileToUpload || !(fileToUpload instanceof File)) {
    showSnackbar("檔案物件無效！請重新選擇。", "error");
    isUploading.value = false;
    return;
  }

  const formData = new FormData();
  formData.append("file", fileToUpload);

  try {
    const response = await $curridataAPI.post(uploadUrl, formData, {
      // 修正超時問題：將 timeout 移到根層
      timeout: 120000,
      headers: {
        // 修正 422 問題：覆寫 Content-Type 為 undefined
        "Content-Type": undefined,
      },
    });

    const result = response.data;
    showSnackbar(`✅ ${result.message}`, "success");

    // 上傳成功後，重新整理檔案列表
    fetchFileList();
  } catch (error) {
    const errorDetail =
      error.response?.data?.detail || error.message || "未知錯誤";
    let displayMessage = `❌ 上傳失敗：${errorDetail}`;
    if (Array.isArray(errorDetail)) {
      displayMessage = `❌ 上傳失敗：伺服器驗證錯誤，請檢查檔案格式。`;
    }

    console.error("上傳失敗的錯誤物件:", error);
    showSnackbar(displayMessage, "error");
  } finally {
    isUploading.value = false;
    selectedFile.value = null;
  }
}

// 4. 輔助函式：顯示 Snackbar 提示
function showSnackbar(text, color) {
  snackbarText.value = text;
  snackbarColor.value = color;
  snackbar.value = true;
}
</script>

<style scoped>
/* 保持不變 */
</style>
