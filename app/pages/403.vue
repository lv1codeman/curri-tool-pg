<template>
  <div
    class="d-flex flex-column align-center justify-center"
    style="height: 100vh"
  >
    <h1 class="mb-4">403 您沒有訪問此頁面的權限，請洽系統管理員。</h1>

    <v-btn
      color="primary"
      variant="flat"
      append-icon="mdi-home"
      @click="goWelcome"
    >
      返回首頁
    </v-btn>
  </div>
</template>

<script setup>
import { navigateTo } from "#app";

const goWelcome = () => {
  navigateTo("/welcome");
};
</script>
