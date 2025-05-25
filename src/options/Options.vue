<script setup lang="ts">
</script>

<template>
  <Wrapper>
    <Date />
    <form
      class="animation-duration-250 backdrop-blur-[10px] backdrop-saturate-[1.5] bg-white/25 rounded-3xl shadow-[0_0_10px_rgba(0,0,0,.2)] text-white h-[43px] left-1/2 max-w-[80%] overflow-hidden fixed top-[200px] translate-x-[-50%] transition-colors duration-250 ease-in-out w-[540px]"
    >
      <input
        autocomplete="off" placeholder="搜索" size="30" type="text"
        class="bg-transparent border-0 text-inherit font-['var(--fonts)'] text-sm outline-none h-full px-5 text-center w-full"
      >
      <button type="button" class="rth-43dad943 rth-29e13152">
        <i></i>
      </button><button type="submit" class="rth-43dad943 rth-058e4bb4">
        <i></i>
      </button>
    </form>
  </Wrapper>
</template>
