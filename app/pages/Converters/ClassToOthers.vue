<template>
  <div class="d-flex justify-center">
    <div>
      <h1>班級簡稱轉換(114以後)</h1>
      <div class="d-flex">
        <v-card class="my-2 my-card-wrapper" variant="tonal" color="indigo">
          <v-card-item>
            <v-card-title>使用教學</v-card-title>

            <v-card-subtitle>輸入限制：班級簡稱</v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <ul>
              <li>
                在左輸入框貼上從Excel複製的班級簡稱，右邊輸入框會自動產出結果。
              </li>
              <li>貼上後想看不同結果可選擇下拉選項</li>
              <li>可將結果複製貼回Excel中使用。</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="indigo-lighten-3 text-white"
              variant="elevated"
              @click="copySampleToClipboard"
            >
              點我複製範例
              <v-icon icon="mdi-content-copy" end></v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="conditional-area d-flex align-center">
        <v-select
          v-model="convert_type"
          class="function-selector mt-4 listitemheight"
          :items="convert_types"
          label="功能選擇"
          :style="{ maxWidth: `${selectWidth}px` }"
          density="comfortable"
        ></v-select>
      </div>

      <v-container id="mpage" class="px-0">
        <v-row no-gutters class="align-center">
          <v-col cols="auto">
            <v-textarea
              ref="inputRef"
              v-model="inputText"
              class="resizable-textarea text-right"
              label="輸入框"
              @paste="handlePaste"
            ></v-textarea>
          </v-col>
          <v-col cols="auto" class="px-2 pb-5">
            <div class="d-flex flex-column ga-5">
              <v-btn
                v-if="
                  convert_type === '系辦助理Email' ||
                  convert_type === '課務承辦人Email'
                "
                color="purple-lighten-3 text-grey-darken-4"
                @click="copyUniqueEmails"
                variant="elevated"
              >
                Email
                <v-icon icon="mdi-email-multiple-outline" end></v-icon>
              </v-btn>
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
              label="輸出框"
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
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useNuxtApp } from "#app";
import { sampleContent } from "@/utils/class_sample.js"; // 根據你的路徑調整
//套用layout
definePageMeta({
  layout: "layout1",
});

// --- 狀態變數 ---
const classMap = ref(new Map());
const inputText = ref("");
const outputText = ref("");
const inputRef = ref(null);
const outputRef = ref(null);
const convert_type = ref("系所簡稱");
const convert_types = [
  "系所簡稱",
  "系所全名",
  "學院簡稱",
  "學院全名",
  "系辦助理",
  "系辦助理分機",
  "系辦助理Email",
  "課務承辦人",
  "課務承辦人分機",
  "課務承辦人Email",
];
const snackbar = ref(false);

let resizeObserverInput = null;
let resizeObserverOutput = null;

const { $curridataAPI } = useNuxtApp();

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

// --- 複製到剪貼簿函式 (通用) ---
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

// --- [修改功能] 複製不重複的 Email 函式，可處理兩種 Email 類型 ---
const copyUniqueEmails = async () => {
  const isAgentEmail = convert_type.value === "系辦助理Email";
  const isCourseAgentEmail = convert_type.value === "課務承辦人Email";

  if (
    !inputText.value ||
    (!isAgentEmail && !isCourseAgentEmail) ||
    !classMap.value.size
  ) {
    return;
  }

  // 決定要提取哪個欄位
  const emailKey = isAgentEmail ? "AGENT_EMAIL" : "CAGENT_EMAIL";

  const lines = inputText.value.split("\n");
  const emails = [];

  // 1. 取得所有對應的 Email
  lines.forEach((line) => {
    const trimmedLine = line.trim();
    const deptData = classMap.value.get(trimmedLine);

    if (deptData && deptData[emailKey] && deptData[emailKey] !== "查無資料") {
      emails.push(deptData[emailKey]);
    }
  });

  // 2. 排除重複的 Email
  const uniqueEmails = [...new Set(emails)];
  const resultText = uniqueEmails.join("\n");

  // 3. 複製到剪貼簿
  try {
    if (!navigator.clipboard) {
      alert("你的瀏覽器不支援剪貼簿功能，請手動複製。");
      return;
    }
    await navigator.clipboard.writeText(resultText);
    snackbar.value = true; // 顯示成功提示
  } catch (err) {
    console.error("複製失敗:", err);
    alert("複製失敗，請手動複製。");
  }
};

// --- 頁面載入時獲取資料 (保持不變) ---
onMounted(async () => {
  try {
    // 呼叫新的 API，只獲取一次所有資料
    const { data } = await $curridataAPI.get("/get_all_data");

    // 直接將 API 返回的資料轉換為 Map
    data.forEach((item) => {
      classMap.value.set(item.CLASS, item);
    });

    console.log("資料已成功載入");
  } catch (error) {
    console.error("載入資料失敗:", error);
  }

  // textarea卷軸同步、拖曳同步效果 (保持不變)
  const inputTextArea = inputRef.value?.$el.querySelector("textarea");
  const outputTextArea = outputRef.value?.$el.querySelector("textarea");

  if (inputTextArea && outputTextArea) {
    const syncScroll = (event) => {
      if (event.target === inputTextArea) {
        outputTextArea.scrollTop = inputTextArea.scrollTop;
      } else if (event.target === outputTextArea) {
        inputTextArea.scrollTop = outputTextArea.scrollTop;
      }
    };
    inputTextArea.addEventListener("scroll", syncScroll);
    outputTextArea.addEventListener("scroll", syncScroll);

    const syncInputToOutput = () => {
      outputTextArea.style.height = `${inputTextArea.offsetHeight}px`;
      outputTextArea.style.width = `${inputTextArea.offsetWidth}px`;
    };
    const syncOutputToInput = () => {
      inputTextArea.style.height = `${outputTextArea.offsetHeight}px`;
      inputTextArea.style.width = `${outputTextArea.offsetWidth}px`;
    };

    resizeObserverInput = new ResizeObserver(syncInputToOutput);
    resizeObserverOutput = new ResizeObserver(syncOutputToInput);

    resizeObserverInput.observe(inputTextArea);
    resizeObserverOutput.observe(outputTextArea);
  }
});

onBeforeUnmount(() => {
  if (resizeObserverInput) resizeObserverInput.disconnect();
  if (resizeObserverOutput) resizeObserverOutput.disconnect();
});

// --- 使用物件來管理轉換邏輯 (保持不變) ---
const conversionFunctions = {
  系所全名: (data) => data.DEPT,
  系所簡稱: (data) => data.DEPT_S,
  學院全名: (data) => data.COLLEGE,
  學院簡稱: (data) => data.COLLEGE_S,
  系辦助理: (data) => data.AGENT_NAME,
  系辦助理分機: (data) => data.AGENT_EXT,
  系辦助理Email: (data) => data.AGENT_EMAIL,
  課務承辦人: (data) => data.CAGENT_NAME,
  課務承辦人分機: (data) => data.CAGENT_EXT,
  課務承辦人Email: (data) => data.CAGENT_EMAIL,
};

const convertedText = computed(() => {
  if (!inputText.value || !classMap.value.size) {
    return "";
  }
  const lines = inputText.value.split("\n");
  const convertFunc = conversionFunctions[convert_type.value];

  if (!convertFunc) return "無效選項";

  const results = lines.map((line) => {
    const trimmedLine = line.trim();
    const deptData = classMap.value.get(trimmedLine);

    if (!deptData) return "查無資料";
    const result = convertFunc(deptData);
    return result || "查無資料"; // 確保空值也回傳查無資料
  });
  return results.join("\n");
});

watch(convertedText, (newValue) => {
  outputText.value = newValue;
});

//計算功能選擇下拉選單的寬度
const selectWidth = computed(() => {
  const longestString = convert_types.reduce(
    (a, b) => (a.length > b.length ? a : b),
    ""
  );
  const characterWidth = 10;
  const padding = 80;
  return longestString.length * characterWidth + padding;
});
</script>

<style scoped>
.btnCopySample {
  background-color: aqua !important;
}

li {
  margin-left: 20px;
}
.v-textarea.resizable-textarea :deep(.v-field) {
  flex: 0 1 auto;
}
.v-textarea.resizable-textarea :deep(textarea) {
  resize: both;
  width: 200px;
  height: 300px;
}
.v-textarea.resizable-textarea.text-right :deep(textarea) {
  text-align: right;
}

/* 可調整Snackbar提示的位置 */
/* .v-snackbar :deep(.v-snackbar__wrapper) {
  bottom: 100px !important;
  right: 100px !important;
  top: auto !important;
  left: auto !important;
} */
.listitemheight {
  min-height: 20px !important;
}
.v-overlay-container .v-overlay__content {
  max-height: 200px;
}
:deep(.v-list-item--density-default.v-list-item--one-line) {
  min-height: 20px;
}
</style>
<style>
/* 因為select下拉選單的項目是在按下後才呈現在v-overlay-container內，所以只能寫在全局style來改變他 */
.v-overlay-container .v-list-item--density-default.v-list-item--one-line {
  min-height: 20px !important;
}
</style>
