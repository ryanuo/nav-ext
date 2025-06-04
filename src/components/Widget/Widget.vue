<script setup lang="ts">
defineProps<{
  show: boolean
  className?: string
  idx?: DockingID
}>()
</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-120 flex items-center justify-center"
      :class="className"
    >
      <div
        class="relative animate-fade-in cursor-pointer rounded-3xl bg-white/40 p-1 shadow-2xl backdrop-blur-lg backdrop-brightness-125 backdrop-saturate-150 dark:bg-[#23272f]/60"
        @click.stop
      >
        <Console v-if="idx === 'all'" />
        <Camera v-if="idx === 'camera'" />
        <Cover v-if="idx === 'cover'" class-name="min-w-[80vw]" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
