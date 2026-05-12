<template>
  <div
    class="welcome-container"
    :class="{ 'is-exiting': isExiting }"
    @click="handleContainerClick"
  >
    <div class="welcome-content" :class="{ 'fade-out-and-rotate': isExiting }">
      <!-- 圖片 -->
      <img
        src="https://media.istockphoto.com/id/1460535745/photo/e-learning-graduate-certificate-program-concept-lightbulb-on-the-book-with-graduation-hat-and.jpg?s=2048x2048&w=is&k=20&c=k5MXyGvT8TTyHQ-eMAiajmA1rp9p9VIrimnPqr0l2q8="
        alt=""
        class="main-image"
      />

      <!-- 課務工具文字 -->
      <h1 class="font-bold welcome-text">課務輔助工具</h1>

      <!-- 點擊進入副提示 -->
      <h2
        class="subtitle-text"
        :class="{
          'is-visible': isMainAnimationFinished,
          'is-flashing': isFlashing,
        }"
      >
        - PRESS TO CONTINUE -
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

useHead({
  title: "課務輔助工具",
  meta: [
    {
      name: "description",
      content: "課務輔助工具歡迎頁面",
    },
    { property: "og:title", content: "課務輔助工具" },
    { property: "og:description", content: "點擊以進入課務輔助工具。" },
    {
      property: "og:image",
      content:
        "https://raw.githubusercontent.com/lv1codeman/curri-tool/refs/heads/main/app/assets/sixer1200_896.png",
    },
    {
      property: "og:type",
      content: "university, class, converter, curriculum, Taiwan",
    },
    { property: "og:url", content: "https://lv1codeman.github.io/curri-tool/" },
  ],
});

const isExiting = ref(false);
const isMainAnimationFinished = ref(false);
const isFlashing = ref(false);
const router = useRouter();

const handleContainerClick = () => {
  if (!isExiting.value) {
    isExiting.value = true;
    isFlashing.value = false;
    // 等待淡出動畫完成後導航
    setTimeout(() => {
      router.push("/Welcome");
    }, 300); // 這裡的 500ms 應與 .fade-out-and-rotate 的 animation-duration 相同 (1s * 0.5)
  }
};

onMounted(() => {
  // 等待主要動畫結束後 (1s)
  setTimeout(() => {
    isMainAnimationFinished.value = true;
    // 等待副標題淡入後 (0.5s)
    setTimeout(() => {
      isFlashing.value = true;
    }, 500);
  }, 1000);
});
</script>

<style scoped>
.welcome-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  cursor: pointer;
  overflow: hidden; /* 防止滾動軸 */
}

.welcome-content {
  text-align: center;
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 圖片的載入動畫：順時針旋轉並淡入 */
.main-image {
  height: 100%; /* 高度佔滿整個容器 */
  width: auto;
  object-fit: cover; /* 保持圖片比例並填滿空間 */
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0) rotate(180deg) scale(0.8); /* 初始狀態：倒轉且縮小 */
  border-radius: 1rem; /* rounded-xl */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  animation: fadeInAndRotate 1s forwards ease-in-out;
}

/* 圖片懸停效果 */
.main-image:hover {
  transform: translate(-50%, 0) scale(1.05) rotate(360deg);
}

/* 主標題的出現動畫：由下往上浮現並淡入 */
.welcome-text {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  opacity: 0;
  white-space: nowrap; /* 避免文字斷行 */
  animation: textEnterUp 1s forwards ease-out;

  /* 在電腦上為 70px */
  font-size: 70px;
}

/* 針對手機的媒體查詢 */
@media (max-width: 640px) {
  .welcome-text {
    /* 在手機上為 30px */
    font-size: 30px;
  }
}

/* 副標題的樣式 */
.subtitle-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  white-space: nowrap;
  top: 24%; /* 最終位置，在主標題下方 */
  font-size: 35px; /* 電腦版大小 (70px * 0.7) */
  transition: opacity 0.68s ease-in-out;
  color: #f3f4f6;
  font-weight: 500;
}

@media (max-width: 640px) {
  .subtitle-text {
    font-size: 21px; /* 手機版大小 (30px * 0.7) */
  }
}

.subtitle-text.is-visible {
  opacity: 1;
}

.subtitle-text.is-flashing {
  animation: flashing 1s infinite alternate;
}

/* 點擊後整體內容的退出動畫：逆時針旋轉並淡出 */
.fade-out-and-rotate {
  animation: fadeOutAndRotate 0.3s forwards ease-in-out;
}

@keyframes fadeInAndRotate {
  from {
    opacity: 0;
    transform: translate(-50%, 0) rotate(160deg) scale(0.5);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0) rotate(360deg) scale(1);
  }
}

@keyframes textEnterUp {
  from {
    opacity: 0;
    top: 50%;
    color: #4b5563;
  }
  to {
    opacity: 1;
    top: 15%;
    color: #ffffff;
  }
}

@keyframes flashing {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.3;
  }
}

@keyframes fadeOutAndRotate {
  from {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
  to {
    opacity: 0;
    transform: rotate(-180deg) scale(0.8);
  }
}
</style>
