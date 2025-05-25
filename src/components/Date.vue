<script setup lang="ts">
import { dateFormat } from '@ryanuo/utils'

// 定义日期时间响应式引用
const currentDateTime = ref('')
let timer: number | null = null

// 组件挂载时启动计时器
onMounted(() => {
  // 立即更新一次时间
  currentDateTime.value = dateFormat(new Date(), 'HH:mm')

  // 每秒更新一次时间
  timer = setInterval(() => {
    currentDateTime.value = dateFormat(new Date(), 'HH:mm')
  }, 1000) as unknown as number
})

// 组件卸载时清除计时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div
    class="top-[5%] items-center animate-fade-meta-in duration-600 ease-[cubic-bezier(.21,.78,.36,1)] flex flex-col justify-center min-h-[140px] absolute transition-transform duration-300 z-10"
  >
    <p class="text-[4em] text-white">
      {{ currentDateTime }}
    </p>
  </div>
</template>

<style scoped>
</style>
