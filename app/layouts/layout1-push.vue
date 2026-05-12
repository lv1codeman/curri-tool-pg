<template>
  <v-app>
    <v-app-bar app>
      <NuxtLink to="/">
        <v-app-bar-title class="pl-4">課務輔助工具</v-app-bar-title>
      </NuxtLink>
    </v-app-bar>
    <v-navigation-drawer
      permanent
      app
      :rail="isDrawerExpanded"
      @mouseenter="isDrawerExpanded = false"
      @mouseleave="isDrawerExpanded = true"
    >
      <v-list nav>
        <v-list-item
          title="回首頁"
          link
          to="/"
          prepend-icon="mdi-home-outline"
        ></v-list-item>
        <v-list-group value="database_maintenance">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-database-cog"
              title="資料庫維護"
            ></v-list-item>
          </template>
          <v-list-item
            title="系所表維護"
            link
            to="/DB/DBmaintain"
            prepend-icon="mdi-database-edit"
          ></v-list-item>
          <v-list-item
            title="課務承辦維護"
            link
            to="/DB/CurriAgent"
            prepend-icon="mdi-account-edit"
          ></v-list-item>
        </v-list-group>
        <v-list-group value="curriculum_tools">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-tools"
              title="課務工具"
            ></v-list-item>
          </template>
          <v-list-item
            title="班級轉換(114)"
            link
            to="/ClassConverter/ClassConverter114"
            prepend-icon="mdi-file-swap"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex align-center justify-center">
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isDrawerExpanded = ref(true);
</script>

<style scoped>
.v-app-bar a {
  text-decoration: none;
  color: inherit;
}
</style>
