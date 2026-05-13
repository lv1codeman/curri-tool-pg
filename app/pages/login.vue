<template>
  <div
    class="d-flex justify-center align-center bg-grey-lighten-4"
    style="height: 100vh"
  >
    <v-card class="login-card rounded-lg pa-2" width="420" elevation="6">
      <!-- 標題 -->
      <v-card-title class="text-h5 primary lighten-2">
        使用者登入
      </v-card-title>

      <!-- 內容 -->
      <v-card-text class="pt-4">
        <v-alert v-if="error" type="error" density="compact" class="mb-3">
          {{ error }}
        </v-alert>

        <v-text-field
          v-model="username"
          label="帳號 (ACCOUNT)"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          density="compact"
          :disabled="loading"
          @keyup.enter="login"
        />

        <v-text-field
          v-model="password"
          label="密碼 (PWD)"
          type="password"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          density="compact"
          :disabled="loading"
          @keyup.enter="login"
        />
      </v-card-text>

      <!-- 按鈕 -->
      <v-card-actions class="d-flex justify-end">
        <v-btn color="error" variant="text" @click="clear" :disabled="loading">
          清空
        </v-btn>

        <v-btn
          color="primary"
          variant="flat"
          :loading="loading"
          @click="login"
          :disabled="!username || !password"
        >
          確認登入
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNuxtApp, navigateTo } from "#app";

definePageMeta({
  layout: false, // ✅ 不用 layout1（避免被 auth 擋）
});

const { $curridataAPI } = useNuxtApp();

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

// ✅ 登入
async function login() {
  loading.value = true;
  error.value = "";

  try {
    const res = await $curridataAPI.post("/api/user_login", {
      username: username.value,
      password: password.value,
    });

    const token = res.data.access_token;
    const user = res.data.user;

    // ✅ 存 token
    localStorage.setItem("curridata_token", token);

    // ✅ 存 user
    localStorage.setItem(
      "curridata_user",
      JSON.stringify({
        id: user.id,
        name: user.name,
        auth: user.auth,
        username: username.value,
      })
    );

    // ✅ 跳轉
    navigateTo("/welcome");
  } catch (err) {
    console.error("login error:", err);

    error.value = err.response?.data?.detail || "登入失敗，請檢查帳號或密碼";
  } finally {
    loading.value = false;
  }
}

// ✅ 清空
function clear() {
  username.value = "";
  password.value = "";
  error.value = "";
}
</script>

<style scoped>
.login-card {
  transform: translateY(-50px);
}
</style>
``
