<script setup lang="ts">
import hotkeys from 'hotkeys-js'
import { useImage } from '@vueuse/core'
import { useMarkStore } from '~/store/option/mark'
import { applyAllOptions, useCoverStore, usePreferenceStore } from '~/store/option/settings'

// 初始化设置
applyAllOptions()

const preferenceStore = usePreferenceStore()
const coverStore = useCoverStore()
const markStore = useMarkStore()
const settingRef = ref<{
  handleIconClick: (item: DockingItem) => void
}>()

const { isLoading } = useImage({
  src: coverStore.cover,
})

function onCommandHPress() {
  settingRef.value?.handleIconClick({
    id: 'settings',
    name: '',
    icon: '',
  })
}

onMounted(() => {
  // 如果没有设置封面图，则直接结束加载状态
  if (!coverStore.cover) {
    isLoading.value = false
  }

  hotkeys('command+h', onCommandHPress)
})

onUnmounted(() => {
  hotkeys.unbind('command+h', onCommandHPress)
})

const showLoading = computed({
  get: () => !!preferenceStore.animation && isLoading.value,
  set: () => {},
})
</script>

<template>
  <div flex="~ col items-center justify-center" class="relative h-full transition-colors duration-300" @click="markStore.initStatus()">
    <ImageLoading v-if="preferenceStore.animation" v-model="showLoading" />

    <div
      v-if="markStore.maskLayerEnabled && !showLoading"
      class="mark fixed left-0 top-0 z-[-1] h-full w-full transition duration-250"
    />
    <img
      v-if="coverStore.coverType === 'image' && coverStore.cover"
      :class="{
        'img-mark': markStore.maskLayerEnabled,
      }"
      class="backface-hidden fixed inset-0 h-full w-full object-cover transition duration-250 ease-in-out -z-3"
      :src="coverStore.cover"
    >
    <video
      v-if="coverStore.coverType === 'video' && coverStore.cover"
      class="backface-hidden fixed inset-0 h-full w-full object-cover transition duration-250 ease-in-out -z-3"
      loop autoplay muted playsinline
      :src="coverStore.cover"
    />
    <template v-if="!showLoading">
      <slot />
      <Docking ref="settingRef" />
    </template>
    <!-- 配置按钮 -->
    <div class="fixed right-4 top-6 z-200 cursor-pointer" @click.stop="onCommandHPress">
      <span
        class="i-tabler-settings h-6 w-6 text-white transition-transform duration-300 hover:rotate-180 dark:text-gray-200"
      />
    </div>
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
</style>
