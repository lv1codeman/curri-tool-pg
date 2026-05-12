<template>
  <v-card hover class="mx-auto h-100 transition-card">
    <v-img
      :src="imageUrl"
      height="150px"
      cover
      class="align-end cursor-pointer"
      @click.stop="$emit('copy', { url: imageUrl, title: title })"
    >
      <v-card-title
        class="text-white bg-black-alpha-50 cursor-pointer"
        @click.stop="$emit('expand')"
      >
        {{ title }}
      </v-card-title>
    </v-img>
  </v-card>
</template>

<script setup>
defineProps({
  title: String,
  imageUrl: String,
});
defineEmits(["copy", "expand"]); // 新增 expand 事件
</script>

<style scoped>
.bg-black-alpha-50 {
  background: rgba(0, 0, 0, 0.65);
}
.cursor-pointer {
  cursor: pointer;
}
.transition-card {
  width: 220px; /* 強制固定寬度，你可以改成你要的數值 (例如 200px) */
  /* height: 320px; 強制固定高度 */
  margin: 0 auto;
  transition: transform 0.2s ease-in-out;
}
</style>
