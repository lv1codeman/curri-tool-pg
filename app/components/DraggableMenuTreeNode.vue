<!-- components/CoolTreeNode.vue -->
<script setup lang="ts">
import type { PageNode } from "./DraggableMenu.vue";

defineProps<{
  node: PageNode;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <li class="relative">
    <div
      class="group flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/50 transition-all"
    >
      <div
        class="w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform"
      ></div>

      <!-- 有路徑的可點擊跳轉 -->
      <NuxtLink
        v-if="node.path"
        :to="node.path"
        @click="$emit('close')"
        class="flex-1 flex items-center justify-between clickable-link"
      >
        <span
          class="font-medium text-slate-200 group-hover:text-indigo-300 transition-colors flex items-center gap-2"
        >
          {{ node.name }}
          <!-- <span
            v-if="node.roles && node.roles.length"
            class="text-[10px] font-mono text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-1.5 py-0.5 rounded"
          >
            {{ node.roles.join(", ") }}
          </span> -->
        </span>
        <!-- <code
          class="text-xs font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800 group-hover:border-slate-700"
        >
          {{ node.file }}
        </code> -->
      </NuxtLink>

      <!-- 無路徑的（例如群組分類標題） -->
      <div v-else class="flex-1 flex items-center justify-between">
        <span class="font-bold text-indigo-400 flex items-center gap-2">
          📂 {{ node.name }}
        </span>
        <span class="text-xs font-mono text-slate-500 italic">Group</span>
      </div>
    </div>

    <!-- 遞迴呼叫自己 -->
    <ul
      v-if="node.children && node.children.length"
      class="pl-4 space-y-3 border-l-2 border-slate-800 ml-4"
    >
      <DraggableMenuTreeNode
        v-for="child in node.children"
        :key="child.name"
        :node="child"
        @close="$emit('close')"
      />
    </ul>
  </li>
</template>
<style scoped>
.clickable-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 15px;
  width: 100%;
  font-weight: 500;
  display: flex; /* 確保元件能撐開滿版 */
  justify-content: space-between;
  align-items: center;
}

/* 也可以順便加上懸停 hover 效果 */
.clickablelink:hover {
  color: #818cf8;
}
</style>
