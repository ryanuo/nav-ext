<script setup lang="ts">
withDefaults(
  defineProps<{
    classname?: string
  }>(),
  {
    classname: 'items-center',
  },
)
</script>

<template>
  <div class="mt-2">
    <div class="flex justify-between" :class="classname">
      <slot />
    </div>
  </div>
</template>
