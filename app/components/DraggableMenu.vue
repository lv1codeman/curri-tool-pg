<!-- components/CoolFloatingMenu.vue -->
<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { useMenu } from "~/composables/useMenu";
import type { MenuItem } from "~/composables/useMenu";

// 1. 取得 useMenu
const { menu } = useMenu();

export interface PageNode {
  name: string;
  file: string;
  path?: string;
  icon?: string;
  roles: string[];
  children?: PageNode[];
}

const transformMenuItem = (item: MenuItem): PageNode => {
  const filePath = item.path
    ? `pages${item.path.startsWith("/") ? item.path : "/" + item.path}.vue`
    : "Folder Group";

  return {
    name: item.title,
    file: filePath,
    path: item.path,
    icon: item.icon,
    roles: item.roles || [],
    children: item.children ? item.children.map(transformMenuItem) : undefined,
  };
};

const siteTree = computed<PageNode[]>(() => {
  return menu ? menu.map(transformMenuItem) : [];
});

// --- 懸浮與開關邏輯 ---
const isOpen = ref(false);
const isDragging = ref(false);
const isMounted = ref(false);

// 座標使用 fixed 絕對定位
const pos = reactive({ x: 0, y: 0 });
const dragStart = reactive({ x: 0, y: 0 });
const initialPos = reactive({ x: 0, y: 0 });
let dragDistance = 0;

onMounted(() => {
  isMounted.value = true;
  // 初始化預設擺在畫面右下角
  pos.x = window.innerWidth - 80;
  pos.y = window.innerHeight - 80;

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", handleResize);
});

const getClientPos = (e: MouseEvent | TouchEvent) => {
  if ("touches" in e) {
    const touch = e.touches[0] || e.changedTouches?.[0];
    if (touch) return { clientX: touch.clientX, clientY: touch.clientY };
  }
  const mouseEvt = e as MouseEvent;
  return { clientX: mouseEvt.clientX, clientY: mouseEvt.clientY };
};

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  dragDistance = 0;

  const { clientX, clientY } = getClientPos(e);
  dragStart.x = clientX;
  dragStart.y = clientY;
  initialPos.x = pos.x;
  initialPos.y = pos.y;

  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchmove", onDrag);
  window.addEventListener("touchend", stopDrag);
};

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;

  const { clientX, clientY } = getClientPos(e);
  const deltaX = clientX - dragStart.x;
  const deltaY = clientY - dragStart.y;

  dragDistance = Math.abs(deltaX) + Math.abs(deltaY);

  const nextX = initialPos.x + deltaX;
  const nextY = initialPos.y + deltaY;

  pos.x = Math.max(10, Math.min(window.innerWidth - 70, nextX));
  pos.y = Math.max(10, Math.min(window.innerHeight - 70, nextY));
};

const stopDrag = () => {
  isDragging.value = false;
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
  window.removeEventListener("touchmove", onDrag);
  window.removeEventListener("touchend", stopDrag);
};

const handleBtnClick = () => {
  if (dragDistance < 5) toggleMenu();
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isOpen.value) toggleMenu();
};

const handleResize = () => {
  if (typeof window !== "undefined") {
    pos.x = Math.min(pos.x, window.innerWidth - 70);
    pos.y = Math.min(pos.y, window.innerHeight - 70);
  }
};

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("resize", handleResize);
  stopDrag();
});
</script>

<template>
  <!-- 使用 ClientOnly + Teleport 確保按鈕被強制渲染在 <body> 最頂層，無視 Layout 排版限制 -->
  <ClientOnly>
    <Teleport to="body" v-if="isMounted">
      <!-- 1. 可拖曳懸浮按鈕 (加入純 CSS 兜底，防止無 Tailwind 時失效) -->
      <button
        class="fixed z-[99999] flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white shadow-2xl hover:bg-indigo-500 cursor-grab active:cursor-grabbing border-2 border-indigo-400/30 backdrop-blur-md select-none"
        :style="{
          position: 'fixed',
          zIndex: 99999,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#4f46e5',
          color: '#ffffff',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
          border: '2px solid rgba(129, 140, 248, 0.3)',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }"
        @mousedown="startDrag"
        @touchstart="startDrag"
        @click="handleBtnClick"
        aria-label="開啟架構選單"
      >
        <svg
          v-if="!isOpen"
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- 2. 全螢幕 Modal 遮罩 (開啟時才顯示) -->
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[99998] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto"
        :style="{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99998,
          backgroundColor: 'rgba(2, 6, 23, 0.65)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }"
        @click.self="toggleMenu"
      >
        <div
          class="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 text-slate-100 overflow-hidden"
          :style="{
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            padding: '32px',
            color: '#f8fafc',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
          }"
        >
          <!-- Header 區 -->
          <div
            class="flex items-center justify-between pb-6 mb-6 border-b border-slate-800"
            :style="{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #1e293b',
              paddingBottom: '16px',
              marginBottom: '16px',
            }"
          >
            <div>
              <h2
                :style="{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  margin: 0,
                  color: '#fff',
                }"
              >
                📌 課務系統 - 頁面架構導覽
              </h2>
              <p
                :style="{
                  fontSize: '13px',
                  color: '#94a3b8',
                  marginTop: '4px',
                  margin: 0,
                }"
              >
                同步自 useMenu.ts 設定檔
              </p>
            </div>
            <button @click="toggleMenu" class="close-btn">關閉 (ESC)</button>
          </div>

          <!-- 3. 節點樹狀區域 -->
          <div :style="{ overflowY: 'auto', flex: 1 }">
            <ul :style="{ listStyle: 'none', padding: '0px', margin: '0px' }">
              <DraggableMenuTreeNode
                v-for="node in siteTree"
                :key="node.name"
                :node="node"
                @close="toggleMenu"
              />
            </ul>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>
<style scoped>
/* 基礎按鈕樣式 */
.close-btn {
  background-color: #334155;
  color: #ffffff;
  border: none;
  padding: 6px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease; /* 讓 hover 顏色變換更平滑 */
}

/* Hover (滑鼠懸停) 效果 */
.close-btn:hover {
  background-color: #475569; /* 懸停時顏色變亮一些 */
  color: #f8fafc;
  /* transform: translateY(-1px); */
}

/* Active (點擊瞬間) 效果 */
.close-btn:active {
  background-color: #1e293b;
  transform: translateY(0);
}
</style>
