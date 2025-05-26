<script lang="ts" setup>
import hotkeys from 'hotkeys-js'
import { initEngineData } from '~/constants/engine'
import { useMarkStore } from '~/store/option/mark'

interface EngineProps {
  modelValue: Engines
  isShowEngine: boolean
  setIsShowEngine: (isShowEngine: boolean) => void
}

const props = defineProps<EngineProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Engines): void
}>()

const markStore = useMarkStore()

const engines = reactive<Engines[]>(initEngineData)
function emitValue(value: Engines) {
  emit('update:modelValue', value)
  props.setIsShowEngine(false)
}

onMounted(() => {
  hotkeys.filter = (event) => {
    return !!(event.target as HTMLElement).closest('#search')
  }

  // 动态生成 Alt+1 到 Alt+n 的快捷键
  engines.forEach((_, index) => {
    const key = index + 1
    const shortcut = `alt+${key}, option+${key}` // 同时支持 Alt 和 Option 键

    hotkeys(shortcut, (event) => {
      if (!markStore.isClickInput)
        return
      event.preventDefault()

      const selectedEngine = engines[key - 1]
      emit('update:modelValue', selectedEngine)
      props.setIsShowEngine(false)
    })
  })
})

// 卸载时移除快捷键
onUnmounted(() => {
  hotkeys.unbind()
})
</script>

<template>
  <div class="h-full w-full flex items-center justify-center" @click.stop="setIsShowEngine(!isShowEngine)">
    <span :class="modelValue?.icon || modelValue?.iconUrl" />
  </div>
  <div v-if="isShowEngine" class="engine">
    <div class="engine-list">
      <div
        v-for="(engine, index) in engines" :key="index"
        class="relative h-8 flex flex-row cursor-pointer items-center justify-between rounded-xl bg-[var(--main-card-background)] p-1 transition-colors duration-300 hover:bg-gray-100/50"
        @click="emitValue(engine)"
      >
        <div class="mr-2 max-w-30 flex flex-row items-center overflow-auto">
          <img v-if="engine.iconUrl" class="h-5 w-5" :src="engine.iconUrl" alt="">
          <span v-if="engine.icon" :class="engine.icon" class="mr-2" />
          {{ engine.name }}
        </div>
        <div class="flex items-center text-xs text-gray-500">
          <span class="i-ci-option" /><span>{{ index + 1 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.engine {
  @apply absolute mt-2 max-h-[44vh] overflow-auto rounded-xl bg-[var(--white-alpha-80)] p-2 backdrop-blur-[var(--main-card-blur)] backdrop-filter;
}
</style>
