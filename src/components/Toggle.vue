<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg'].includes(value),
  },
  color: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: String,
    default: 'duration-200',
    validator: value => ['duration-150', 'duration-200', 'duration-300', 'duration-500'].includes(value),
  },
})

const emits = defineEmits(['update:modelValue'])

function handleChange(event) {
  if (!props.disabled) {
    emits('update:modelValue', event.target.checked)
  }
}

const computedClasses = computed(() => {
  const classes = []

  if (props.disabled) {
    classes.push('opacity-50 cursor-not-allowed')
  }

  return classes.join(' ')
})

function getColorClass() {
  const colorMap = {
    primary: 'peer-checked:bg-primary-500',
    secondary: 'peer-checked:bg-secondary-500',
    success: 'peer-checked:bg-success-500',
    warning: 'peer-checked:bg-warning-500',
    error: 'peer-checked:bg-error-500',
  }

  return colorMap[props.color] || 'peer-checked:bg-primary-500'
}

function getTransitionClass() {
  return props.transition
}

function getSizeClass() {
  const sizeMap = {
    sm: 'w-9 h-5 after:h-4 after:w-4 after:top-[1.5px] after:left-[1.5px]',
    md: 'w-11 h-6 after:h-5 after:w-5 after:top-[2px] after:left-[2px]',
    lg: 'w-14 h-7 after:h-6 after:w-6 after:top-[2.5px] after:left-[2.5px]',
  }

  return sizeMap[props.size] || sizeMap.md
}
</script>

<template>
  <label
    class="relative inline-flex cursor-pointer items-center"
    :class="computedClasses"
  >
    <input
      type="checkbox"
      role="switch"
      :checked="modelValue"
      class="peer sr-only"
      @change="handleChange"
    >
    <div
      class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:border after:border-gray-300 after:rounded-full after:bg-white peer-focus:outline-none after:transition-all after:content-[''] peer-checked:after:translate-x-full"
      :class="[getColorClass(), getTransitionClass(), getSizeClass()]"
    />
    <span v-if="label" class="ml-3 text-sm text-gray-700 font-medium">
      {{ label }}
    </span>
  </label>
</template>

<style scoped>
@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
  .bg-primary-500 {
    background-color: #3b82f6;
  }
  .bg-secondary-500 {
    background-color: #64748b;
  }
  .bg-success-500 {
    background-color: #10b981;
  }
  .bg-warning-500 {
    background-color: #f59e0b;
  }
  .bg-error-500 {
    background-color: #ef4444;
  }
}
</style>
