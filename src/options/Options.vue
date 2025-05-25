<script setup lang="ts">
</script>

<template>
  <Wrapper>
    <Date />
    <form class="form-control">
      <input autocomplete="off" placeholder="搜索" size="30" type="text" class="input-control">
      <button type="button" class="rth-43dad943 rth-29e13152">
        <i></i>
      </button>
      <button type="submit" class="btn btn-search">
        <span class="i-eva-search-fill" />
      </button>
    </form>
  </Wrapper>
</template>

<style scoped>
.form-control {
  @apply animation-duration-250 fixed left-1/2 top-[30%] h-[43px] max-w-[80%] w-[540px] translate-x-[-50%] overflow-hidden rounded-3xl bg-white/25 text-white shadow-[0_0_10px_rgba(0, 0, 0, .2)] backdrop-blur-[10px] backdrop-saturate-[1.5] transition-colors duration-250 ease-in-out;
}

.input-control {
  @apply h-full w-full border-0 bg-transparent px-10 text-center text-sm text-inherit outline-none;
}

.btn {
  @apply absolute h-8 w-8 top-1.4 hover:bg-white rounded-2xl;
}

.btn-search {
  @apply right-1 text-blue;
}
</style>
