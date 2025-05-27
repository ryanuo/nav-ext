<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '~/store/option/search'

const searchStore = useSearchStore()
const { engines } = storeToRefs(searchStore)

// 存储当前拖拽的索引和悬停的索引
const draggedIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

// 处理拖拽开始
function handleDragStart(index: number) {
  draggedIndex.value = index
}

// 处理拖拽悬停
function handleDragOver(index: number) {
  if (draggedIndex.value === index)
    return

  // 更新悬停索引
  dragOverIndex.value = index

  // 获取拖拽的元素
  const draggedItem = engines.value[draggedIndex.value!]

  // 从原位置删除
  engines.value.splice(draggedIndex.value!, 1)

  // 插入到新位置
  engines.value.splice(index, 0, draggedItem)

  // 更新拖拽索引为新位置
  draggedIndex.value = index
}

// 处理拖拽放置
function handleDrop() {
  // 重置状态
  draggedIndex.value = null
  dragOverIndex.value = null
}
</script>

<template>
  <div class="mx-auto p-1 container">
    <div class="rounded-xl bg-white p-2 shadow-lg">
      <div class="space-y-2">
        <div
          v-for="(engine, index) in engines"
          :key="engine.name"
          :data-index="index"
          class="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-3 shadow-sm transition-all duration-200 hover:shadow"
          draggable="true"
          :class="{ 'bg-primary/10': dragOverIndex === index }"
          @dragstart="handleDragStart(index)"
          @dragover.prevent="handleDragOver(index)"
          @dragleave.prevent
          @drop="handleDrop()"
        >
          <div class="w-full flex items-center justify-between space-x-3">
            <div flex="~ items-center gap-1">
              <div class="cursor-grab text-gray-500">
                <IconRenderer :icon="engine.icon" :icon-url="engine.iconUrl" />
              </div>
              <div class="text-lg font-medium">
                {{ engine.name }}
              </div>
            </div>
            <div flex="~ items-center gap-1">
              <span class="i-mdi-sort" /> {{ index + 1 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@unocss-placeholder;
</style>
