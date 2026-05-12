<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, index) in mcCommands"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <CopyCard
          :title="item.title"
          :subtitle="item.command"
          @copy="copyCode($event)"
          class="h-100"
        />
      </v-col>
    </v-row>
  </v-container>

  <v-snackbar
    v-model="snackbar"
    :timeout="3000"
    color="success"
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
import { ref } from "vue";
import CopyCard from "@/components/CopyCard.vue";

definePageMeta({
  layout: "layout1",
});

// 1. 結構化的資料陣列：未來要新增指令直接加在這裡
const mcCommands = [
  {
    title: "要塞（Stronghold）",
    command: "/locate structure minecraft:stronghold",
  },
  {
    title: "堡壘遺跡（Bastion Remnant）",
    command: "/locate structure minecraft:bastion_remnant",
  },
  {
    title: "地獄堡壘（Nether Fortress）",
    command: "/locate structure minecraft:fortress",
  },
  {
    title: "扭曲森林（Warped Forest)",
    command: "/locate biome minecraft:warped_forest",
  },
  // 你可以輕鬆地繼續增加，例如：
  // { title: "末地城 (End City)", command: "/locate structure minecraft:end_city" }
];

// 2. 狀態管理
const snackbar = ref(false);
const snackbarText = ref("");

// 3. 複製邏輯
async function copyCode(codeToCopy) {
  try {
    await navigator.clipboard.writeText(codeToCopy);
    snackbarText.value = "✅ 指令已成功複製到剪貼簿！";
    snackbar.value = true;
  } catch (err) {
    console.error("無法複製文字:", err);
    snackbarText.value = "❌ 複製失敗，請手動複製。";
    snackbar.value = true;
  }
}
</script>

<style scoped>
/* 移除原本複雜的 .card-grid 樣式，交給 Vuetify 處理 */
.h-100 {
  height: 100%;
}
</style>
