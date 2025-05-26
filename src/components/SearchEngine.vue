<script lang="ts" setup>
import hotkeys from 'hotkeys-js'
import { storeToRefs } from 'pinia'
import { initEngineData } from '~/constants/engine'
import { useMarkStore } from '~/store/option/mark'
import { useSearchStore } from '~/store/option/search'

const isShowEngine = ref(false)

const markStore = useMarkStore()
const searchStore = useSearchStore()
const { searchEngine } = storeToRefs(searchStore)
const { setSearchEngine } = searchStore
const engines = reactive<Engines[]>(initEngineData)

function handleSelectEngine(engine: Engines) {
  setSearchEngine(engine)
  isShowEngine.value = false
}

defineExpose({
  isShowEngine,
  setIsShowEngine(val: boolean) {
    isShowEngine.value = val
  },
})

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
      handleSelectEngine(selectedEngine)
    })
  })
})

// 卸载时移除快捷键
onUnmounted(() => {
  hotkeys.unbind()
})
</script>

<template>
  <div class="h-full w-full flex items-center justify-center" @click.stop="isShowEngine = !isShowEngine">
    <span :class="searchEngine?.icon || searchEngine?.iconUrl" />
  </div>
  <div v-if="isShowEngine" class="engine">
    <div class="engine-list">
      <div
        v-for="(engine, index) in engines" :key="index"
        class="relative h-8 flex flex-row cursor-pointer items-center justify-between rounded-xl bg-[var(--main-card-background)] p-1 transition-colors duration-300 hover:bg-gray-100/50"
        @click="handleSelectEngine(engine)"
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
