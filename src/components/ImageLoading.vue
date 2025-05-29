<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'afterLeave'])

const visible = ref(props.modelValue)
const stage = ref(0)

let timer1: ReturnType<typeof setTimeout> | null = null
let timer2: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      visible.value = true
      stage.value = 0
    }
    else {
      // 1. loading图标先渐隐
      stage.value = 1
      timer1 = setTimeout(() => {
        // 2. 遮罩拉开
        stage.value = 2
        timer2 = setTimeout(() => {
          visible.value = false
        }, 500)
      }, 200)
    }
  },
  { immediate: true },
)

function onAfterLeave() {
  emit('afterLeave')
}

onUnmounted(() => {
  if (timer1) {
    clearTimeout(timer1)
  }
  if (timer2) {
    clearTimeout(timer2)
  }
})
</script>

<template>
  <Transition @after-leave="onAfterLeave">
    <div v-if="visible" class="pointer-events-auto fixed inset-0 z-9999 flex items-center justify-center">
      <!-- 左遮罩 -->
      <div
        class="absolute left-0 top-0 h-full w-1/2 bg-black/80 transition-transform duration-500"
        :class="stage === 2 ? '-translate-x-full' : 'translate-x-0'"
      />
      <!-- 右遮罩 -->
      <div
        class="absolute right-0 top-0 h-full w-1/2 bg-black/80 transition-transform duration-500"
        :class="stage === 2 ? 'translate-x-full' : 'translate-x-0'"
      />
      <!-- loading 图标 -->
      <div
        v-if="stage < 1"
        class="relative z-1 flex items-center justify-center transition-opacity duration-200"
        :class="stage === 1 ? 'opacity-0' : 'opacity-100'"
      >
        <slot>
          <div class="i-svg-spinners-ring-resize h-8 w-8 text-white" />
        </slot>
      </div>
    </div>
  </Transition>
</template>
