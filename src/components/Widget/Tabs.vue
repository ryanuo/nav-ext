<script setup lang="ts">
import { consolesMap } from '~/constants/common'

const tabs = ref(Object.keys(consolesMap).map(tab => ({
  title: tab,
})))

// 当前激活索引
const activeIndex = ref(0)
</script>

<template>
  <div class="h-[50vh] w-[70vw] overflow-auto">
    <div class="sticky top-4 m-4 flex gap-4">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="rounded-full px-4 py-1 transition-all"
        :class="activeIndex === index
          ? 'bg-[--c-100] text-[--c-600] font-medium'
          : 'text-white hover:text-[--c-600]'"
        @click="activeIndex = index"
      >
        {{ tab.title }}
      </button>
    </div>

    <!-- 标签内容插槽 -->
    <div>
      <slot :name="`tab-${activeIndex}`" />
    </div>
  </div>
</template>
