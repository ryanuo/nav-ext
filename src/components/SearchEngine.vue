<script lang="ts" setup>
import { initEngineData } from '~/constants/engine'

interface EngineProps {
  isShowEngine: boolean
  setIsShowEngine: (isShowEngine: boolean) => void
}

defineProps<EngineProps>()
const engines = reactive<{
  name: string
  url: string
  icon: string
  iconUrl?: string
}[]>(initEngineData)
const selectEngine = ref('Google')
const selectEngineMap = computed(() => {
  return engines.find(item => item.name === selectEngine.value)
})
</script>

<template>
  <div class="h-full w-full flex items-center justify-center" @click.stop="setIsShowEngine(!isShowEngine)">
    <span :class="selectEngineMap?.icon || selectEngineMap?.iconUrl" />
  </div>
  <div v-if="isShowEngine" class="engine">
    <div class="engine-list">
      <div
        v-for="(engine, index) in engines" :key="index"
        class="relative h-8 flex flex-row cursor-pointer items-center rounded-xl bg-[var(--main-card-background)_hsla(0,0%,100%,.25)] p-1 transition-colors duration-300 hover:bg-gray-100/50"
        @click="selectEngine = engine.name"
      >
        <img v-if="engine.iconUrl" class="h-5 w-5" :src="engine.iconUrl" alt="">
        <span v-if="engine.icon" :class="engine.icon" class="mr-2" />
        {{ engine.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.engine {
  @apply absolute mt-2 max-h-[44vh] overflow-auto rounded-xl bg-[var(--main-card-background)] p-2 backdrop-blur-[var(--main-card-blur)] backdrop-filter;
}
</style>
