<!-- components/IconRenderer.vue -->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  iconUrl?: string
  icon?: string
  styleClass?: string
}>(), {
  iconUrl: '',
  icon: '',
  styleClass: 'mr-2',
})

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
    class="h-4 w-4"
  />
  <component
    :is="iconType"
    v-else
    :class="[iconClass, styleClass]"
  />
</template>
