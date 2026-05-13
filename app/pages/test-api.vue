<template>
  <div style="padding: 2rem">
    <h1>API 測試頁</h1>

    <button @click="loadDepts" :disabled="loading">
      {{ loading ? "讀取中..." : "讀取系所資料" }}
    </button>

    <pre v-if="result" style="margin-top: 1rem"
      >{{ JSON.stringify(result, null, 2) }}
    </pre>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { $curridataAPI } = useNuxtApp();

const loading = ref(false);
const result = ref(null);

console.log("start");

const loadDepts = async () => {
  loading.value = true;
  try {
    const res = await $curridataAPI.get("/get_depts");
    console.log("API 回傳：", res.data); // ✅ 關鍵 log
    result.value = res.data;
  } catch (err) {
    console.error("API 錯誤：", err);
    result.value = err;
  } finally {
    loading.value = false;
  }
};
</script>
