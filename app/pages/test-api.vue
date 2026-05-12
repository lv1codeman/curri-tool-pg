<template>
  <div style="padding: 2rem">
    <h1>API 測試頁</h1>

    <button @click="loadDepts" :disabled="loading">
      {{ loading ? "讀取中..." : "讀取系所資料" }}
    </button>

    <pre v-if="result">{{ result }}</pre>
  </div>
</template>

<script setup>
import { ref } from "vue";

// ✅ 從 Nuxt 取得 axios plugin
const { $curridataAPI } = useNuxtApp();

const loading = ref(false);
const result = ref(null);

const loadDepts = async () => {
  loading.value = true;
  try {
    const res = await $curridataAPI.get("/get_depts");
    result.value = res.data;
  } catch (err) {
    console.error(err);
    result.value = err;
  } finally {
    loading.value = false;
  }
};
</script>
``
