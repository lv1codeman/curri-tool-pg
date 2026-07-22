<template>
  <div
    class="d-flex justify-center align-center bg-grey-lighten-4"
    style="height: 100vh"
  >
    <v-card class="login-card rounded-lg pa-2" width="420" elevation="6">
      <!-- 標題 -->
      <v-card-title class="text-h5"> 請輸入帳密登入 </v-card-title>

      <v-card-subtitle> 本系統使用 Neon 雲端資料庫 </v-card-subtitle>

      <v-card-subtitle>
        資料庫久未使用會睡眠，登入約需等候 20~30 秒
      </v-card-subtitle>

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
          :loading="loading"
          variant="flat"
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
import { useUser } from "~/composables/useUser";

definePageMeta({
  layout: false,
});

const { $curridataAPI } = useNuxtApp();

/* ✅ ✅ ✅ 使用 store */
const { setUser } = useUser();

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

async function login() {
  if (!username.value || !password.value) return;

  loading.value = true;
  error.value = "";

  try {
    const res = await $curridataAPI.post("/api/user_login", {
      username: username.value,
      password: password.value,
    });
    const token = res.data.access_token;
    const user = res.data.user;

    /* ✅ ✅ ✅ 🔥 改成 store（核心） */
    setUser(
      {
        id: user.id,
        name: user.name,
        auth: user.auth,
        username: username.value,
      },
      token
    );

    /* ✅ redirect */
    redirectByRole(user.auth);
  } catch (err) {
    console.error(err);

    error.value = err.response?.data?.detail || "登入失敗，請確認帳號密碼";
  } finally {
    loading.value = false;
  }
}

/* ✅ ✅ ✅ 依角色導向 */
function redirectByRole(role) {
  // 不做身份導向，都導向welcome頁面
  return navigateTo("/welcome");
}

/* 清空 */
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
