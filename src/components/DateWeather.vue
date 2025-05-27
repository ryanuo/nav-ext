<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useMarkStore } from '~/store/option/mark'
import { useSettingsStore } from '~/store/option/settings'
import { useDateTime } from '~/composables/useDateTime'

const settingsStore = useSettingsStore()

const { currentDateTime } = useDateTime()

const isZh = useI18n().locale.value === 'zh-CN'

const markStore = useMarkStore()
function handleDateFocus() {
  markStore.setShowConsoleEnabled(true)
}

const weatherIframeSrc = computed(() => {
  const lang = isZh ? 'cn' : 'en'
  const city = settingsStore?.weatherCity?.city?.pinyin || 'beijing'
  return `https://i.tianqi.com/?c=code&a=getcode&id=34&py=${city}&icon=1&lang=${lang}&color=%23fff7ff`
})
</script>

<template>
  <div class="time">
    <p class="text-[4em] text-white" @click.stop="handleDateFocus">
      {{ currentDateTime }}
    </p>
    <iframe
      v-if="settingsStore.showWeather"
      height="30"
      width="235"
      :src="weatherIframeSrc" frameborder="0"
    />
  </div>
</template>

<style scoped>
.time {
  @apply top-[12%] items-center animate-fade-meta-in duration-600 ease-[cubic-bezier(.21, .78, .36, 1)] flex flex-col justify-center min-h-[140px] absolute transition-transform duration-300 z-10;
}

.time p {
  @apply cursor-pointer;
}
</style>
