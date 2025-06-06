<script setup lang="ts">
import hotkeys from 'hotkeys-js'
import { useImage } from '@vueuse/core'
import { useMarkStore } from '~/store/option/mark'
import { useCoverStore, usePreferenceStore } from '~/store/option/settings'

const preferenceStore = usePreferenceStore()
const coverStore = useCoverStore()
const markStore = useMarkStore()
const settingRef = ref<{
  setIsSettingsButtonVisible: (visible: boolean) => void
  isSettingsButtonVisible: boolean
}>()

const { isLoading } = useImage({
  src: coverStore.cover,
})

function onCommandHPress(event: KeyboardEvent) {
  if (event) {
    event.preventDefault()
  }

  if (markStore.isShowWidget && !settingRef.value?.isSettingsButtonVisible) {
    settingRef.value?.setIsSettingsButtonVisible(markStore.isShowWidget)
    return
  }

  markStore.setShowWidget(!markStore.isShowWidget)
  // 确保在状态更新后再设置按钮可见性
  nextTick(() => {
    settingRef.value?.setIsSettingsButtonVisible(markStore.isShowWidget)
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
      loop muted playsinline autoplay
      :src="coverStore.cover"
    />
    <template v-if="!showLoading">
      <slot />
      <Docking :setting-function="onCommandHPress" />
    </template>
    <Settings v-if="markStore.isShowWidget" ref="settingRef" />
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
