<template>
  <div class="d-flex justify-center">
    <div>
      <h1>學號轉學制</h1>
      <div class="d-flex">
        <v-card class="my-2 my-card-wrapper" variant="tonal" color="teal">
          <v-card-item>
            <v-card-title>使用教學</v-card-title>
            <v-card-subtitle>輸入限制：學號</v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <ul>
              <li>
                在左輸入框貼上從Excel複製的學號
                (每行一個)，右邊輸入框會自動產出結果。
              </li>
              <li>結果可將複製貼回Excel中使用。</li>
            </ul>
            <v-divider class="my-3"></v-divider>
            <p><strong>學制轉換規則：</strong></p>
            <ul>
              <li>學號開頭為 S = 學士班</li>
              <li>學號開頭為 M = 碩士班</li>
              <li>學號開頭為 D = 博士班</li>
              <li>其他開頭 = 查無資料</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="teal-lighten-3 text-white"
              variant="elevated"
              @click="copySampleToClipboard"
            >
              點我複製範例
              <v-icon icon="mdi-content-copy" end></v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <v-container id="mpage" class="px-0 pt-4">
        <v-row no-gutters class="align-center">
          <v-col cols="auto">
            <v-textarea
              ref="inputRef"
              v-model="inputText"
              class="resizable-textarea text-right"
              label="輸入學號 (每行一個)"
              @paste="handlePaste"
            ></v-textarea>
          </v-col>
          <v-col cols="auto" class="px-2 pb-5">
            <div class="d-flex flex-column ga-5">
              <v-btn
                color="green-lighten-3 text-grey-darken-4"
                @click="copyToClipboard"
              >
                Copy
                <v-icon icon="mdi-content-copy" end></v-icon>
              </v-btn>
              <v-btn
                color="blue-lighten-3 text-grey-darken-4"
                @click="clearTextareas"
              >
                Clear
                <v-icon icon="mdi-close-circle-outline" end></v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="auto">
            <v-textarea
              ref="outputRef"
              v-model="outputText"
              class="resizable-textarea"
              label="輸出學制"
              readonly
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>

      <v-snackbar
        v-model="snackbar"
        :timeout="2000"
        color="success"
        location="bottom right"
      >
        已複製到剪貼簿
      </v-snackbar>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
// 假設你新增了一個學號範例檔案
// 由於你沒有提供，這裡先使用一個本地的範例字串
const sampleContent = "S1234567\nM9876543\nD0000001\nZ5555555";

//套用layout
definePageMeta({
  layout: "layout1",
});

// --- 狀態變數 ---
const inputText = ref("");
const outputText = ref("");
const inputRef = ref(null);
const outputRef = ref(null);
const snackbar = ref(false);

// --- 轉換邏輯 ---
const convertStudentIdToSystem = (studentId) => {
  if (!studentId || typeof studentId !== "string") {
    return "查無資料";
  }

  // 取得第一個字元並轉為大寫，以確保判斷的一致性
  const firstChar = studentId.trim().toUpperCase().charAt(0);

  switch (firstChar) {
    case "S":
      return "學士班";
    case "M":
      return "碩士班";
    case "D":
      return "博士班";
    default:
      return "查無資料";
  }
};

const convertedText = computed(() => {
  if (!inputText.value) {
    return "";
  }

  // 將輸入內容按換行符號分割，並去除空行
  const lines = inputText.value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const results = lines.map((line) => {
    return convertStudentIdToSystem(line);
  });

  return results.join("\n");
});

watch(convertedText, (newValue) => {
  outputText.value = newValue;
});

// --- 處理貼上事件的函式 ---
const handlePaste = (event) => {
  event.preventDefault();
  const pasteData = event.clipboardData.getData("text");
  inputText.value = pasteData.trim();
};

// --- 清空函式 ---
const clearTextareas = () => {
  inputText.value = "";
  outputText.value = "";
};

// --- 複製到剪貼簿函式 (輸出結果) ---
const copyToClipboard = async () => {
  try {
    if (!navigator.clipboard) {
      alert("你的瀏覽器不支援剪貼簿功能，請手動複製。");
      return;
    }
    await navigator.clipboard.writeText(outputText.value);
    snackbar.value = true;
  } catch (err) {
    console.error("複製失敗:", err);
    alert("複製失敗，請手動複製。");
  }
};

// --- 複製到剪貼簿函式 (範例內容) ---
const copySampleToClipboard = async () => {
  try {
    if (!navigator.clipboard) {
      alert("你的瀏覽器不支援剪貼簿功能，請手動複製。");
      return;
    }
    await navigator.clipboard.writeText(sampleContent);
    snackbar.value = true;
  } catch (err) {
    console.error("複製失敗:", err);
    alert("複製失敗，請手動複製。");
  }
};

// --- 樣式保留 (保留原本的寬高同步樣式，但因為沒有 ResizeObserver，所以尺寸不會同步) ---
</script>

<style scoped>
li {
  margin-left: 20px;
}
.v-textarea.resizable-textarea :deep(.v-field) {
  flex: 0 1 auto;
}
/* 簡化 textarea 樣式，不再需要同步邏輯，設定固定寬高 */
.v-textarea.resizable-textarea :deep(textarea) {
  /* 移除 resize: both; */
  width: 250px !important; /* 稍微加大寬度 */
  height: 350px !important; /* 稍微加大高度 */
  min-width: 200px;
  min-height: 200px;
}
.v-textarea.resizable-textarea.text-right :deep(textarea) {
  text-align: right;
}
</style>
