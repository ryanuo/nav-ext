<script setup lang="ts">
const icons = [
  { name: '浏览器', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f30d.png' },
  { name: '终端', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f5a5.png' },
  { name: '音乐', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3b5.png' },
  { name: '照片', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4f7.png' },
  { name: '设置', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2699.png' },
  { name: '邮件', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2709.png' },
  { name: '日历', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4c5.png' },
  { name: '笔记', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4dd.png' },
  { name: '下载', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2b07.png' },
  { name: '文件', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4c1.png' },
]
</script>

<template>
  <div class="grid grid-cols-5 gap-8">
    <div
      v-for="(icon, idx) in icons"
      :key="idx"
      class="group flex flex-col items-center"
    >
      <div
        class="mb-2 h-16 w-16 flex items-center justify-center rounded-2xl bg-white/80 text-3xl shadow transition-transform duration-200 group-hover:scale-110 dark:bg-[#23272f]/80"
        :style="{ animation: `fadeIn 0.5s ${idx * 0.04}s both` }"
      >
        <img :src="icon.src" :alt="icon.name" class="h-10 w-10 object-contain">
      </div>
      <span class="text-xs text-gray-700 dark:text-gray-200">{{ icon.name }}</span>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
