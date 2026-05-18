<template>
  <v-container style="max-width: 1300px">
    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-text-field
          v-model="searchQuery"
          label="搜尋梗圖關鍵字..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          class="mr-4"
        ></v-text-field>
        <v-btn
          color="primary"
          prepend-icon="mdi-upload"
          @click="uploadDialog = true"
        >
          上傳梗圖
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="!isLoading">
      <v-col
        v-for="(meme, index) in filteredMemes"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-menu
          v-model="meme.showPreview"
          :close-on-content-click="true"
          location="center"
          transition="scale-transition"
          min-width="300"
        >
          <template v-slot:activator="{ props }">
            <MemeCard
              v-bind="props"
              :title="meme.title"
              :image-url="ensureHttps(meme.url)"
              @copy="copyImageToClipboard"
              @expand="meme.showPreview = true"
            />
          </template>

          <v-card width="500" elevation="24" class="rounded-xl overflow-hidden">
            <v-img
              :src="ensureHttps(meme.url)"
              max-height="600"
              contain
              class="bg-grey-darken-4"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-text class="bg-surface text-center py-4 border-t">
              <div class="text-h6 font-weight-bold">{{ meme.title }}</div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-col>

      <v-col
        cols="12"
        v-if="filteredMemes.length === 0"
        class="text-center py-12"
      >
        <v-icon size="64" color="grey-lighten-1"
          >mdi-image-search-outline</v-icon
        >
        <p class="text-grey mt-2">找不到相關梗圖，換個關鍵字試試？</p>
      </v-col>
    </v-row>

    <v-row v-else justify="center">
      <v-col cols="12" class="text-center py-12">
        <v-progress-circular
          indeterminate
          color="primary"
          size="50"
        ></v-progress-circular>
        <p class="mt-4">梗圖載入中...</p>
      </v-col>
    </v-row>

    <v-dialog v-model="uploadDialog" max-width="450px" persistent>
      <v-card class="rounded-lg">
        <v-card-title class="bg-primary text-white px-6 py-4"
          >上傳新梗圖</v-card-title
        >
        <v-card-text class="pt-8 px-6">
          <v-text-field
            v-model="newTitle"
            label="梗圖描述與關鍵字"
            variant="outlined"
            placeholder="例如：驚訝貓咪 表情包"
            hint="輸入愈詳細，之後搜尋愈容易找到喔！"
            persistent-hint
            class="mb-10"
          ></v-text-field>
          <v-file-input
            v-model="selectedFile"
            label="選擇圖片檔案"
            accept="image/*"
            variant="outlined"
            prepend-icon="mdi-camera"
            :show-size="1024"
          ></v-file-input>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            @click="closeUploadDialog"
            :disabled="isUploading"
            >取消</v-btn
          >
          <v-btn
            color="primary"
            variant="elevated"
            :loading="isUploading"
            @click="handleUpload"
            >確認上傳</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      location="bottom right"
      timeout="3000"
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

definePageMeta({
  layout: "layout1",
});
const { $curridataAPI } = useNuxtApp();

// 狀態定義
interface Meme {
  title: string;
  url: string;
  showPreview?: boolean; // 用於控制每個卡片獨立的預覽狀態
}

const memes = ref<Meme[]>([]);
const searchQuery = ref("");
const isLoading = ref(true);
const uploadDialog = ref(false);
const isUploading = ref(false);
const newTitle = ref("");
const selectedFile = ref<File | File[] | null>(null);
const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("success");

// 1. 取得梗圖清單
async function fetchMemes() {
  isLoading.value = true;
  try {
    const response = await ($curridataAPI as any).get("/api/memes");
    // 🎯 初始化時為每個 meme 加入 showPreview 響應式屬性
    memes.value = response.data.map((m: any) => ({
      ...m,
      showPreview: false,
    }));
  } catch (error) {
    console.error("無法取得梗圖列表:", error);
    showToast("❌ 無法連線至伺服器", "error");
  } finally {
    isLoading.value = false;
  }
}

// 2. 處理上傳
async function handleUpload() {
  if (!selectedFile.value || !newTitle.value) {
    showToast("請輸入名稱並選擇圖片", "warning");
    return;
  }

  isUploading.value = true;
  const formData = new FormData();
  const file = Array.isArray(selectedFile.value)
    ? selectedFile.value[0]
    : selectedFile.value;
  formData.append("file", file as Blob);
  formData.append("title", newTitle.value);

  try {
    await ($curridataAPI as any).post("/api/upload-meme", formData, {
      // 關鍵點：將 Content-Type 設為 undefined
      // 這會告訴 Axios 不要使用插件裡的 application/json
      // 瀏覽器發現 body 是 FormData 後，會自動補上 multipart/form-data 並加上正確的 boundary
      headers: {
        "Content-Type": undefined,
      },
    });

    showToast("✅ 梗圖上傳成功！", "success");
    closeUploadDialog();
    await fetchMemes();
  } catch (error: any) {
    // 增加錯誤日誌，方便你看到 FastAPI 回傳的具體驗證失敗原因
    console.error("上傳失敗細節:", error.response?.data);
    showToast("❌ 上傳失敗", "error");
  } finally {
    isUploading.value = false;
  }
}

// 3. 搜尋邏輯
const filteredMemes = computed(() => {
  if (!searchQuery.value) return memes.value;
  const keywords = searchQuery.value.toLowerCase().trim().split(/\s+/);
  return memes.value.filter((meme) => {
    const title = meme.title.toLowerCase();
    return keywords.every((key) => title.includes(key));
  });
});

// 4. 複製到剪貼簿
async function copyImageToClipboard({ url, title }: Meme) {
  try {
    const finalUrl = url.replace("http://", "https://") + `?t=${Date.now()}`;
    const response = await fetch(finalUrl, {
      headers: { "ngrok-skip-browser-warning": "true" },
    });
    if (!response.ok) throw new Error("Fetch 失敗");
    const blob = await response.blob();

    const img = new Image();
    img.crossOrigin = "anonymous";
    const objectUrl = URL.createObjectURL(blob);
    img.src = objectUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d")?.drawImage(img, 0, 0);

    canvas.toBlob(async (pngBlob) => {
      if (!pngBlob) return;
      try {
        const item = new ClipboardItem({ "image/png": pngBlob });
        await navigator.clipboard.write([item]);
        showToast(`✅ 已複製 「${title}」`, "success");
      } catch (err) {
        showToast("❌ 寫入剪貼簿失敗", "error");
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    }, "image/png");
  } catch (err) {
    showToast("❌ 複製失敗", "error");
  }
}

// 5. 輔助函數
function closeUploadDialog() {
  uploadDialog.value = false;
  newTitle.value = "";
  selectedFile.value = null;
}

function showToast(text: string, color: string = "success") {
  snackbarText.value = text;
  snackbarColor.value = color;
  snackbar.value = true;
}

function ensureHttps(url: string) {
  return url ? url.replace("http://", "https://") : "";
}

onMounted(fetchMemes);
</script>

<style scoped>
/* 這裡不需要額外的 CSS，因為大小由 MemeCard 控制 */
</style>
