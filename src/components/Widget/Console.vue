<script setup lang="ts">
import { consolesMap } from '~/constants/common'

function handleClick(icon: ConsoleItem) {
  window.open(icon.link)
}
</script>

<template>
  <Tabs>
    <template v-for="([, list], index) in Object.entries(consolesMap)" :key="index" #[`tab-${index}`]>
      <div class="grid grid-cols-10">
        <div
          v-for="(icon, idx) in list"
          :key="idx"
          class="group flex flex-col items-center"
          @click="handleClick(icon)"
        >
          <div
            class="mb-2 h-16 w-16 flex items-center justify-center rounded-2xl bg-white/80 text-3xl shadow transition-transform duration-200 group-hover:scale-110 dark:bg-[#23272f]/80"
            :style="{ animation: `fadeIn 0.5s ${idx * 0.04}s both` }"
          >
            <img v-if="icon.iconUrl" :src="icon.iconUrl" :alt="icon.name" class="h-10 w-10 object-contain">
            <i v-else class="iconfont" :class="icon.icon" />
          </div>
          <span class="text-xs text-gray-700 dark:text-gray-200">{{ icon.name }}</span>
        </div>
      </div>
    </template>
  </Tabs>
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
