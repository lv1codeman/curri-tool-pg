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
import { ref, computed, watch, onMounted } from "vue";
import { useNuxtApp, navigateTo } from "#app";
import { sampleContent } from "@/utils/class_sample.js";

definePageMeta({
  layout: "layout1",
});

// ✅ ✅ ✅ 🔥 核心：字串清理函式（最重要）
const normalize = (str) =>
  str
    .replace(/\r/g, "") // 移除 CR
    .replace(/\uFEFF/g, "") // 移除 BOM
    .trim();

// 狀態
const classMap = ref(new Map());
const inputText = ref("");
const outputText = ref("");
const convert_type = ref("系所簡稱");
const snackbar = ref(false);

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

const { $curridataAPI } = useNuxtApp();

// ✅ 貼上（這裡也補強）
const handlePaste = (event) => {
  event.preventDefault();
  const pasteData = event.clipboardData.getData("text");

  inputText.value = pasteData
    .replace(/\r/g, "")
    .replace(/\uFEFF/g, "")
    .trim();
};

// ✅ 複製
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputText.value);
    snackbar.value = true;
  } catch {
    alert("複製失敗");
  }
};

const copySampleToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(sampleContent);
    snackbar.value = true;
  } catch {
    alert("複製失敗");
  }
};

const clearTextareas = () => {
  inputText.value = "";
  outputText.value = "";
};

// ✅ Email 去重（也用 normalize）
const copyUniqueEmails = async () => {
  const isAgentEmail = convert_type.value === "系辦助理Email";
  const isCourseAgentEmail = convert_type.value === "課務承辦人Email";

  const emailKey = isAgentEmail ? "AGENT_EMAIL" : "CAGENT_EMAIL";

  const emails = inputText.value
    .split("\n")
    .map((line) => {
      const key = normalize(line);
      const data = classMap.value.get(key);
      return data?.[emailKey];
    })
    .filter(Boolean);

  const uniqueEmails = [...new Set(emails)];

  await navigator.clipboard.writeText(uniqueEmails.join("\n"));
  snackbar.value = true;
};

// ✅ 讀 API
onMounted(async () => {
  try {
    const res = await $curridataAPI.get("/get_all_data");
    const data = res.data;

    data.forEach((item) => {
      if (item.CLASS) {
        const key = normalize(item.CLASS); // ✅ 同步清理
        classMap.value.set(key, item);
      }
    });
  } catch (error) {
    console.error("載入失敗:", error);
    navigateTo("/login");
  }
});

// ✅ 對應
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

// ✅ ✅ ✅ 🔥 核心轉換（修正點！）
const convertedText = computed(() => {
  if (!inputText.value || !classMap.value.size) return "";

  const fn = conversionFunctions[convert_type.value];

  return inputText.value
    .split("\n")
    .map((line) => {
      const key = normalize(line);
      const data = classMap.value.get(key);
      if (data.length <= 0) {
        navigateTo("/welcome");
      }
      return data ? fn(data) || "查無資料" : "查無資料";
    })
    .join("\n");
});

// ✅ 同步輸出
watch(convertedText, (val) => {
  outputText.value = val;
});

// ✅ select 寬度
const selectWidth = computed(() => {
  const max = convert_types.reduce((a, b) => (a.length > b.length ? a : b));
  return max.length * 10 + 80;
});
</script>

<style scoped>
.my-card-wrapper {
  max-width: 620px; /* 或 width: 580px; 依據你下方輸入框的總寬度微調 */
  width: 100%; /* 在小螢幕上會自動縮小，保持響應式 */
  padding: 5px;
}

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
