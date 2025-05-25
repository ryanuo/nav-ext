<template>
  <div class="docking">
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
</template>

<style scoped>
.docking {
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
  @apply animate-[identifier] backdrop-filter backdrop-blur-[var(--main-backdrop-filter)] bg-[var(--white-alpha-10)] rounded-[20px] bottom-[10px] flex left-[50%] max-w-[calc(100%-20px)] overflow-hidden p-[10px] fixed translate-x-[-50%] transition duration-250 whitespace-nowrap;
}

.docking div {
  height: 40px;
  width: 40px;
}

@keyframes identifier {
  0% {
    opacity: 0;
    transform: translate(-50%) translateY(50%);
  }

  100% {
    opacity: 1;
    transform: translate(-50%);
  }
}
</style>
