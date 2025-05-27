<script setup lang="ts">
import { dayjs } from '@ryanuo/utils'
import { useI18n } from 'vue-i18n'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc' // 新增
import { useMarkStore } from '~/store/option/mark'
import { useSettingsStore } from '~/store/option/settings'

dayjs.extend(timezone)
dayjs.extend(utc)

const settingsStore = useSettingsStore()

// 定义日期时间响应式引用
const currentDateTime = ref('')
let timer: number | null = null

const isZh = useI18n().locale.value === 'zh-CN'

// 组件挂载时启动计时器
onMounted(() => {
  // 立即更新一次时间（用 dayjs.tz）
  currentDateTime.value = dayjs.tz(new Date()).format('HH:mm')

  // 每秒更新一次时间
  timer = setInterval(() => {
    currentDateTime.value = dayjs.tz(new Date()).format('HH:mm')
  }, 1000) as unknown as number
})

watchEffect(() => {
  // 如果时区设置发生变化，更新 dayjs 的默认时区
  if (settingsStore.timezone) {
    dayjs.tz.setDefault(settingsStore.timezone)
  }
})

// 组件卸载时清除计时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const markStore = useMarkStore()
function handleDateFocus() {
  markStore.setShowNavs(true)
}

const weatherIframeSrc = computed(() => {
  const lang = isZh ? 'cn' : 'en'
  const city = settingsStore?.weatherCity?.city?.pinyin || 'beijing'
  return `https://i.tianqi.com/?c=code&a=getcode&id=26&py=${city}&icon=1&lang=${lang}&color=%23fff7ff`
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
      width="174"
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
