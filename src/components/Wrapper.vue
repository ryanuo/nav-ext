<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMarkStore } from '~/store/option/mark'
import { useSettingsStore } from '~/store/option/settings'

const settings = useSettingsStore()
const markStore = useMarkStore()
const isLoading = ref(true)

function handleImageLoad() {
  isLoading.value = false
}

const isShowPage = computed(() => {
  if (settings.animation) {
    return !isLoading.value
  }

  return true
})

onMounted(() => {
  // 如果没有设置封面图，则直接结束加载状态
  if (!settings.cover) {
    isLoading.value = false
  }
})
</script>

<template>
  <div flex="~ col items-center justify-center" class="relative h-full" @click="markStore.initStatus()">
    <!-- 加载动画 -->
    <div v-if="!isShowPage" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div class="border-primary h-10 w-10 animate-spin border-4 border-t-transparent rounded-full" />
    </div>

    <div
      v-if="markStore.isMark && isShowPage"
      class="mark fixed left-0 top-0 z-[-1] h-full w-full transition duration-250"
    />
    <img
      v-show="isShowPage"
      :class="{
        'img-mark': markStore.isMark,
      }"
      class="backface-hidden fixed inset-0 h-full w-full object-cover transition duration-250 ease-in-out -z-3"
      :src="settings.cover"
      alt=""
      @load="handleImageLoad"
    >
    <template v-if="isShowPage">
      <slot />
    </template>
    <Settings v-if="markStore.isShowNavs" />
  </div>
</template>

<style scoped>
.mark {
  background-image:
    radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
}

.img-mark {
  transform: scale(1.1);
  filter: blur(10px);
}

/* 加载动画样式 */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
