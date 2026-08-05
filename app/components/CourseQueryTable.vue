<template>
  <div>
    <h2>{{ title }}</h2>

    <!-- 錯誤提示區域 -->
    <div v-if="errorMessage && !snackbar" class="text-red-500 mb-4">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- 查詢條件表單區塊 -->
    <v-card class="mt-4 pa-4" elevation="2">
      <v-card-title class="px-0 pt-0 font-weight-bold">
        <v-icon icon="mdi-filter-variant" class="me-2" />查詢條件設定
      </v-card-title>
      <v-card-text class="px-0 border-b pb-2">
        <v-form ref="queryForm" @submit.prevent="handleSearch">
          <v-row density="compact">
            <v-col
              v-for="field in queryFields"
              :key="field.key"
              cols="12"
              sm="6"
              md="3"
            >
              <!-- 文字輸入框 -->
              <v-text-field
                v-if="field.type === 'text'"
                v-model="queryParams[field.key]"
                :label="field.label"
                variant="outlined"
                density="compact"
                hide-details="auto"
                clearable
              ></v-text-field>

              <!-- 下拉選單 -->
              <v-select
                v-else-if="field.type === 'select'"
                v-model="queryParams[field.key]"
                :items="field.items"
                :item-title="field['item-title'] || 'title'"
                :item-value="field['item-value'] || 'value'"
                :label="field.label"
                variant="outlined"
                density="compact"
                hide-details="auto"
                clearable
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <!-- 操作按鈕區 -->
      <v-card-actions class="px-0 pt-4 d-flex justify-end ga-3">
        <v-btn
          color="grey-darken-1"
          variant="outlined"
          prepend-icon="mdi-refresh"
          @click="resetQuery"
          :disabled="loading || downloadLoading"
        >
          重置條件
        </v-btn>

        <v-btn
          color="primary"
          variant="flat"
          prepend-icon="mdi-magnify"
          @click="handleSearch"
          :loading="loading"
        >
          查詢課程
        </v-btn>

        <v-btn
          color="success"
          variant="flat"
          prepend-icon="mdi-file-excel"
          @click="downloadExcel"
          :loading="downloadLoading"
        >
          下載 Excel
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- 查詢結果表格區塊 -->
    <v-card class="mt-6">
      <v-card-title>
        <div class="d-flex ga-4 justify-space-between align-center w-100">
          <span>{{ tableTitle }} (共 {{ items.length }} 筆)</span>
          <v-text-field
            v-model="search"
            label="快速關鍵字過濾"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
            single-line
            class="search-field"
          ></v-text-field>
        </div>
      </v-card-title>

      <v-data-table
        :headers="tableHeaders"
        :items="filteredItems"
        :loading="loading"
        class="elevation-10"
        no-data-text="暫無課程資料，請調整查詢條件後點擊查詢"
        loading-text="資料載入中..."
      >
        <!-- 格式化全英語 / 遠距教學 狀態標籤 -->
        <template v-slot:item.eng="{ item }">
          <v-chip :color="item.eng === 'Y' ? 'green' : 'grey'" size="small">
            {{ item.eng === "Y" ? "是" : "否" }}
          </v-chip>
        </template>

        <template v-slot:item.dis_learn="{ item }">
          <v-chip
            :color="item.dis_learn === 'Y' ? 'blue' : 'grey'"
            size="small"
          >
            {{ item.dis_learn === "Y" ? "是" : "否" }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>

    <!-- 訊息提示 Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :color="snackbarColor"
      location="top center"
    >
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">
          關閉
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useNuxtApp } from "#app";

// -----------------
// Props 定義
// -----------------
const props = defineProps({
  title: { type: String, default: "課程查詢與匯出" },
  tableTitle: { type: String, default: "課程清單" },
  apiUrl: { type: String, default: "/course_query" },
});

// -----------------
// 狀態變數
// -----------------
const { $curridataAPI } = useNuxtApp();

const items = ref([]);
const search = ref("");
const loading = ref(false);
const downloadLoading = ref(false);
const errorMessage = ref(null);

// Snackbar 狀態
const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("deep-orange-darken-1");

// 表單預設查詢參數（依照後端 API 預設值）
const defaultParams = {
  year: "115",
  semester: "1",
  branch: "",
  clsid: "",
  crsid: "",
  crsnm: "",
  tchnm: "",
  week: "",
  eng: "",
  dis_learn: "",
};

const queryParams = reactive({ ...defaultParams });

// 查詢欄位配置表（對應 API 參數）
const queryFields = [
  { key: "year", label: "學年度", type: "text" },
  {
    key: "semester",
    label: "學期",
    type: "select",
    items: [
      { title: "第一學期", value: "1" },
      { title: "第二學期", value: "2" },
    ],
  },
  {
    key: "branch",
    label: "部別",
    type: "select",
    items: [
      { title: "全部", value: "" },
      { title: "日間部 (D)", value: "D" },
      { title: "夜間部 (N)", value: "N" },
    ],
  },
  { key: "clsid", label: "班級代碼", type: "text" },
  { key: "crsnm", label: "課程名稱", type: "text" },
  { key: "tchnm", label: "教師姓名", type: "text" },
  { key: "crsid", label: "課程代碼", type: "text" },
  {
    key: "week",
    label: "星期",
    type: "select",
    items: [
      { title: "不限", value: "" },
      { title: "星期一", value: "1" },
      { title: "星期二", value: "2" },
      { title: "星期三", value: "3" },
      { title: "星期四", value: "4" },
      { title: "星期五", value: "5" },
      { title: "星期六", value: "6" },
      { title: "星期日", value: "7" },
    ],
  },
  {
    key: "eng",
    label: "全英語教學",
    type: "select",
    items: [
      { title: "不限", value: "" },
      { title: "是 (Y)", value: "Y" },
      { title: "否 (N)", value: "N" },
    ],
  },
  {
    key: "dis_learn",
    label: "遠距教學",
    type: "select",
    items: [
      { title: "不限", value: "" },
      { title: "是 (Y)", value: "Y" },
      { title: "否 (N)", value: "N" },
    ],
  },
];

// 表格 Header 配置
const tableHeaders = [
  { title: "學年度", key: "year" },
  { title: "學期", key: "semester" },
  { title: "班級代碼", key: "clsid" },
  { title: "課程代碼", key: "crsid" },
  { title: "課程名稱", key: "crsnm" },
  { title: "教師名稱", key: "tchnm" },
  { title: "星期", key: "week" },
  { title: "全英語", key: "eng" },
  { title: "遠距教學", key: "dis_learn" },
];

// -----------------
// 計算屬性與工具
// -----------------
// 過濾空白字串參數
const cleanParams = computed(() => {
  const params = {};
  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key] !== "" && queryParams[key] !== null) {
      params[key] = queryParams[key];
    }
  });
  return params;
});

// 前端二次關鍵字搜尋
const filteredItems = computed(() => {
  if (!search.value) return items.value;
  const searchText = search.value.toLowerCase();
  return items.value.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText)
    )
  );
});

// 顯示提示訊息
const showToast = (message, color = "deep-orange-darken-1") => {
  snackbarText.value = message;
  snackbarColor.value = color;
  snackbar.value = true;
};

// -----------------
// API 核心邏輯
// -----------------

// 1. 執行查詢
const handleSearch = async () => {
  loading.value = true;
  errorMessage.value = null;
  try {
    const response = await $curridataAPI.get(props.apiUrl, {
      params: cleanParams.value,
    });
    // 若 API 回傳列表資料
    items.value = Array.isArray(response.data)
      ? response.data
      : response.data.items || [];
  } catch (error) {
    console.error("Query Error:", error);
    errorMessage.value =
      error.response?.data?.detail || "無法從 API 取得課程資料。";
    showToast(errorMessage.value);
  } finally {
    loading.value = false;
  }
};

// 2. 重置表單條件
const resetQuery = () => {
  Object.assign(queryParams, defaultParams);
  handleSearch();
};

// 3. 下載 Excel (Blob 自動下載)
const downloadExcel = async () => {
  downloadLoading.value = true;
  try {
    const response = await $curridataAPI.get(props.apiUrl, {
      params: cleanParams.value,
      responseType: "blob", // 確保以二進位流接收
    });

    // 解析 Header 裡面的檔名（若後端有帶 Content-Disposition）
    let fileName = `Course_List_${queryParams.year}_${queryParams.semester}.xlsx`;
    const contentDisposition = response.headers["content-disposition"];
    if (contentDisposition) {
      const match = contentDisposition.match(
        /filename\*?=['"]?(?:UTF-8'')?([^;'"\n]*)['"]?/
      );
      if (match && match[1]) {
        fileName = decodeURIComponent(match[1]);
      }
    }

    // 建立 Blob URL 並觸發下載
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    // 清理資源
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);

    showToast("Excel 下載成功！", "success");
  } catch (error) {
    console.error("Download Error:", error);
    showToast(error.response?.data?.detail || "Excel 下載失敗，請稍後再試。");
  } finally {
    downloadLoading.value = false;
  }
};

// 頁面掛載時觸發首次預設查詢
onMounted(() => {
  handleSearch();
});
</script>

<style scoped>
.search-field {
  min-width: 150px;
}

@media (min-width: 600px) {
  .search-field {
    min-width: 260px;
  }
}
</style>
