<template>
  <v-container fluid class="pa-6">
    <!-- 頁面標題 -->
    <div class="mb-4">
      <h1
        class="text-h5 font-weight-bold d-flex align-center ga-2 text-primary"
      >
        <v-icon icon="mdi-book-search-outline"></v-icon>
        課程查詢下載
      </h1>
      <p class="text-subtitle-2 text-grey-darken-1 mt-1 mb-0">
        可下載為Excel檔以供篩選。
      </p>
    </div>

    <!-- 錯誤訊息提示 -->
    <div v-if="errorMessage && !snackbar" class="text-red-500 mb-4">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- 查詢條件表單區塊 -->
    <v-card class="mt-4 pa-4" elevation="2">
      <v-card-title class="px-0 pt-0 font-weight-bold">
        <v-icon icon="mdi-filter-variant" class="me-2" />查詢條件設定
      </v-card-title>

      <v-card-text class="px-0 border-b pb-2">
        <v-form ref="queryForm" @submit.prevent="downloadExcel">
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
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useNuxtApp } from "#app";

// 1. 套用指定 Layout
definePageMeta({
  layout: "layout1",
});

// 2. 狀態與 API 設定
const { $curridataAPI } = useNuxtApp();
const API_URL = "/api/course_query";

const loading = ref(false);
const downloadLoading = ref(false);
const errorMessage = ref(null);

// Toast 提示框狀態
const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("deep-orange-darken-1");
const currentROCYear = new Date().getFullYear() - 1911; // 115

// 表單預設查詢參數（對應 FastAPI 預設值）
const defaultParams = {
  year: "115",
  semester: "1",
  branch: "",
  class_id: "",
  course_id: "",
  course_name: "",
  teacher_name: "",
  week: "",
  eng: "",
  dis_learn: "",
};

const queryParams = reactive({ ...defaultParams });

// 查詢欄位動態配置表
const queryFields = [
  {
    key: "year",
    label: "學年度",
    type: "select",
    items: Array.from({ length: currentROCYear - 100 + 1 }, (_, i) => {
      const y = String(100 + i);
      return { title: y, value: y };
    }).reverse(),
  },
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
  { key: "class_id", label: "班級代碼", type: "text" },
  { key: "course_name", label: "課程名稱", type: "text" },
  { key: "teacher_name", label: "教師姓名", type: "text" },
  { key: "course_id", label: "課程代碼", type: "text" },
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

// 3. 計算屬性 (Computed)

// 自動清理未填寫的空白參數
const cleanParams = computed(() => {
  const params = {};
  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key] !== "" && queryParams[key] !== null) {
      params[key] = queryParams[key];
    }
  });
  return params;
});

// 4. 方法 (Methods)

const showToast = (message, color = "deep-orange-darken-1") => {
  snackbarText.value = message;
  snackbarColor.value = color;
  snackbar.value = true;
};

// 重置查詢條件
const resetQuery = () => {
  Object.assign(queryParams, defaultParams);
  //   handleSearch();
};

// 下載 Excel (Blob 串流處理)
const downloadExcel = async () => {
  downloadLoading.value = true;
  try {
    const response = await $curridataAPI.get(API_URL, {
      params: cleanParams.value,
      responseType: "blob",
    });

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

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(downloadUrl);

    showToast("Excel 下載成功！", "success");
  } catch (error) {
    console.error("Download Error:", error);

    // 解析 Blob 錯誤訊息
    if (error.response?.data instanceof Blob) {
      const errorText = await error.response.data.text();
      try {
        const errorJson = JSON.parse(errorText);
        showToast(errorJson.detail || "Excel 下載失敗，請稍後再試。");
      } catch (e) {
        showToast("下載失敗，伺服器回應異常。");
      }
    } else {
      showToast(error.response?.data?.detail || "Excel 下載失敗，請稍後再試。");
    }
  } finally {
    downloadLoading.value = false;
  }
};

// 頁面掛載時觸發一次查詢
onMounted(() => {
  //   handleSearch();
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
