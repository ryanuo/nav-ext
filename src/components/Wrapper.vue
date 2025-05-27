<script setup lang="ts">
import hotkeys from 'hotkeys-js'
import { onMounted, ref } from 'vue'
import { useMarkStore } from '~/store/option/mark'
import { useSettingsStore } from '~/store/option/settings'

const settings = useSettingsStore()
const markStore = useMarkStore()
const hasImageFinishedLoading = ref(true)
const settingRef = ref<{
  setIsSettingsButtonVisible: (visible: boolean) => void
}>()

function handleImageLoad() {
  hasImageFinishedLoading.value = false
}

const isPageVisible = computed(() => {
  if (settings.animation) {
    return !hasImageFinishedLoading.value
  }

  return true
})

function onCommandHPress(event: KeyboardEvent) {
  event.preventDefault()
  markStore.setShowConsoleEnabled(!markStore.isShowConsoleEnabled)
  // 确保在状态更新后再设置按钮可见性
  nextTick(() => {
    settingRef.value?.setIsSettingsButtonVisible(markStore.isShowConsoleEnabled)
  })
}

onMounted(() => {
  // 如果没有设置封面图，则直接结束加载状态
  if (!settings.cover) {
    hasImageFinishedLoading.value = false
  }

  hotkeys('command+h', onCommandHPress)
})

onUnmounted(() => {
  hotkeys.unbind('command+h', onCommandHPress)
})
</script>

<template>
  <div flex="~ col items-center justify-center" class="relative h-full" @click="markStore.initStatus()">
    <!-- 加载动画 -->
    <div v-if="!isPageVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div class="border-primary h-10 w-10 animate-spin border-4 border-t-transparent rounded-full" />
    </div>

    <div
      v-if="markStore.maskLayerEnabled && isPageVisible"
      class="mark fixed left-0 top-0 z-[-1] h-full w-full transition duration-250"
    />
    <img
      v-show="isPageVisible"
      :class="{
        'img-mark': markStore.maskLayerEnabled,
      }"
      class="backface-hidden fixed inset-0 h-full w-full object-cover transition duration-250 ease-in-out -z-3"
      :src="settings.cover"
      alt=""
      @load="handleImageLoad"
    >
    <template v-if="isPageVisible">
      <slot />
    </template>
    <Settings v-if="markStore.isShowConsoleEnabled" ref="settingRef" />
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
