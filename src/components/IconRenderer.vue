<!-- components/IconRenderer.vue -->
<script setup lang="ts">
const props = defineProps<{
  // 图标URL
  iconUrl?: string
  // Font Awesome类名
  icon?: string
}>()

// 计算图标类型（img或i）
const iconType = computed(() => {
  return props.iconUrl ? 'img' : 'i'
})

// 计算图标类
const iconClass = computed(() => {
  return props.icon || ''
})
</script>

<template>
  <component
    :is="iconType"
    v-if="iconType === 'img'"
    :src="iconUrl"
    alt=""
    class="mr-2 h-4 w-4"
  />
  <component
    :is="iconType"
    v-else
    :class="iconClass"
    class="mr-2"
  />
</template>
