<template>
  <div class="d-flex justify-center">
    <div>
      <h1>生日轉民國碼</h1>
      <!-- 1. 新增：獨立放在卡片上方的格式選擇區 -->
      <v-card class="my-2 d-inline-block" variant="text" color="teal-darken-2">
        <v-card-text class="py-1">
          <div class="d-flex align-center ga-3">
            <span class="text-subtitle-1 font-weight-bold"
              >請選擇輸入格式：</span
            >
            <v-btn-toggle
              v-model="inputFormat"
              color="teal-darken-2"
              mandatory
              density="compact"
              variant="outlined"
            >
              <v-btn value="chinese">中文日期 (89年06月22日)</v-btn>
              <v-btn value="slash">西元斜線 (2006/12/26)</v-btn>
            </v-btn-toggle>
          </div>
        </v-card-text>
      </v-card>
      <div>
        <v-card class="my-card-wrapper" variant="tonal" color="teal">
          <v-card-item>
            <v-card-title>目前模式：{{ currentModeSubtitle }}</v-card-title>
            <!-- <v-card-text> 目前模式：{{ currentModeSubtitle }} </v-card-text> -->
          </v-card-item>
          <v-card-text>
            <ul>
              <li>
                在左輸入框貼上從 Excel 複製的生日字串
                (每行一個)，右邊輸入框會自動產出 7 碼民國碼。
              </li>
              <li>結果可將複製貼回 Excel 中使用。</li>
            </ul>

            <p class="mt-3"><strong>轉換規則說明：</strong></p>
            <ul>
              <li v-if="inputFormat === 'chinese'">
                將「XX年XX月XX日」統一轉換為「3碼民國年份 + 2碼月份 + 2碼日期」
              </li>
              <li v-else>
                將「YYYY/MM/DD」自動計算西元年減 1911
                換算為民國年，並轉為「3碼民國年份 + 2碼月份 + 2碼日期」
              </li>
              <li>
                民國年份若不足 3 碼（如 89 年），會自動在前方補 0 變為 089
              </li>
              <li>格式不符或空行會自動顯示「格式錯誤」或跳過</li>
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
              label="輸入生日 (每行一個)"
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
              label="輸出民國碼"
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

// 套用 layout
definePageMeta({
  layout: "layout1",
});

// --- 狀態變數 ---
const inputFormat = ref("chinese"); // 'chinese' | 'slash'
const inputText = ref("");
const outputText = ref("");
const inputRef = ref(null);
const outputRef = ref(null);
const snackbar = ref(false);

// 動態範例字串
const sampleContent = computed(() => {
  if (inputFormat.value === "chinese") {
    return "89年06月22日\n88年11月06日\n103年1月2日\n5年5月20日";
  } else {
    return "2000/06/22\n1999/11/06\n2014/01/02\n1916/05/20";
  }
});

// 使用教學小標題動態顯示
const currentModeSubtitle = computed(() => {
  return inputFormat.value === "chinese"
    ? "中文日期格式 (如：89年06月22日)"
    : "西元斜線格式 (如：2006/12/26 或 2006/1/2)";
});

// --- 轉換邏輯 ---
const convertBirthToFormat = (birthStr) => {
  if (!birthStr || typeof birthStr !== "string") {
    return "格式錯誤";
  }

  const cleanStr = birthStr.trim();

  if (inputFormat.value === "chinese") {
    // 模式 A：中文格式「X年X月X日」
    const regex = /^(\d{1,3})年(\d{1,2})月(\d{1,2})日$/;
    const match = cleanStr.match(regex);

    if (match) {
      const year = match[1].padStart(3, "0");
      const month = match[2].padStart(2, "0");
      const day = match[3].padStart(2, "0");

      return `${year}${month}${day}`;
    }
  } else if (inputFormat.value === "slash") {
    // 模式 B：西元斜線格式「YYYY/MM/DD」或「YYYY-MM-DD」
    // 支援 4 碼西元年，1~2 碼月、日
    const regex = /^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})$/;
    const match = cleanStr.match(regex);

    if (match) {
      const solarYear = parseInt(match[1], 10);
      const monthNum = parseInt(match[2], 10);
      const dayNum = parseInt(match[3], 10);

      // 簡單的日期合理性檢查（月 1-12、日 1-31）
      if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
        return "格式錯誤";
      }

      // 計算民國年（西元 - 1911）
      const rocYear = solarYear - 1911;

      // 不支援民國前或過於不合理的年份
      if (rocYear <= 0) {
        return "格式錯誤";
      }

      const year = String(rocYear).padStart(3, "0");
      const month = String(monthNum).padStart(2, "0");
      const day = String(dayNum).padStart(2, "0");

      return `${year}${month}${day}`;
    }
  }

  return "格式錯誤";
};

const convertedText = computed(() => {
  if (!inputText.value) {
    return "";
  }

  const lines = inputText.value.split("\n");

  const results = lines.map((line) => {
    if (line.trim().length === 0) return "";
    return convertBirthToFormat(line);
  });

  return results.join("\n");
});

// 當轉換結果改變時，更新 outputText
watch(convertedText, (newValue) => {
  outputText.value = newValue;
});

// --- 處理貼上事件 ---
const handlePaste = (event) => {
  event.preventDefault();
  const pasteData = event.clipboardData.getData("text");
  inputText.value = pasteData.trim();
};

// --- 清空 ---
const clearTextareas = () => {
  inputText.value = "";
  outputText.value = "";
};

// --- 複製到剪貼簿 (輸出結果) ---
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

// --- 複製到剪貼簿 (範例內容) ---
const copySampleToClipboard = async () => {
  try {
    if (!navigator.clipboard) {
      alert("你的瀏覽器不支援剪貼簿功能，請手動複製。");
      return;
    }
    await navigator.clipboard.writeText(sampleContent.value);
    snackbar.value = true;
  } catch (err) {
    console.error("複製失敗:", err);
    alert("複製失敗，請手動複製。");
  }
};
</script>

<style scoped>
li {
  margin-left: 20px;
  word-break: break-word;
}

#mpage {
  /* max-width: 600px; */
}

.my-card-wrapper {
  max-width: 620px; /* 或 width: 580px; 依據你下方輸入框的總寬度微調 */
  width: 100%; /* 在小螢幕上會自動縮小，保持響應式 */
  padding: 5px;
}
.v-textarea.resizable-textarea :deep(.v-field) {
  flex: 0 1 auto;
}
.v-textarea.resizable-textarea :deep(textarea) {
  width: 250px !important;
  height: 350px !important;
  min-width: 200px;
  min-height: 200px;
}
.v-textarea.resizable-textarea.text-right :deep(textarea) {
  text-align: right;
}
</style>
