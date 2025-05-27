<script setup lang="ts">
import { useMarkStore } from '~/store/option/mark'
import { useSettingsStore } from '~/store/option/settings'

const settings = useSettingsStore()
const markStore = useMarkStore()
</script>

<template>
  <div
    flex="~ col items-center justify-center" class="h-full"
    @click="markStore.initStatus()"
  >
    <div
      v-if="markStore.isMark"
      class="mark fixed left-0 top-0 z-[-1] h-full w-full transition duration-250"
    />
    <img
      :class="{
        'img-mark': markStore.isMark,
      }"
      class="backface-hidden fixed inset-0 h-full w-full object-cover transition duration-250 ease-in-out -z-3"
      :src="settings.cover"
      alt="" srcset=""
    >
    <slot />
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
</style>
