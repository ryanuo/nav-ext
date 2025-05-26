<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMarkStore } from '~/store/option/mark'
import { useSearchStore } from '~/store/option/search'

const markStore = useMarkStore()
const searchEngineRef = ref<{ isShowEngine: Ref<boolean>, setIsShowEngine: (isShow: boolean) => void }>()
const searchStore = useSearchStore()
const { searchQuery } = storeToRefs(searchStore)
const { setSearchQuery, submit } = searchStore

function handleInputFocus() {
  markStore.setClickInput(true)

  if (searchEngineRef.value?.isShowEngine) {
    searchEngineRef.value.setIsShowEngine(false)
  }
}

function handleInput(e: any) {
  setSearchQuery(e.target.value)
}

function handleKeydown(e: any) {
  if (e.keyCode === '13') {
    e.preventDefault()
  }
}
</script>

<template>
  <Wrapper>
    <Date />
    <form v-if="!markStore.isShowNavs" class="form-control">
      <input
        id="search"
        :class="{
          'input-focus': markStore.isClickInput,
        }"
        :value="searchQuery"
        autocomplete="off"
        placeholder="搜索" size="30" type="text" class="input-control" @input="handleInput"
        @click.stop="handleInputFocus"
        @keydown="handleKeydown"
      >
      <SearchSuggestions />
      <template v-if="markStore.isClickInput">
        <button
          type="button" class="btn btn-toggle"
          @click.stop
        >
          <SearchEngine ref="searchEngineRef" />
        </button>
        <button type="button" class="btn btn-search" @click.stop="submit()">
          <span class="i-eva-search-fill" />
        </button>
      </template>
    </form>
    <!-- <Docking /> -->
  </Wrapper>
</template>

<style scoped>
.form-control {
  @apply animation-duration-250 rounded-18 fixed left-1/2 top-[30%] h-[43px] max-w-[80%] w-[540px] translate-x-[-50%] rounded-3xl bg-white/25 text-white shadow-[0_0_10px_rgba(0, 0, 0, .2)] backdrop-blur-[10px] backdrop-saturate-[1.5] transition-colors duration-250 ease-in-out;
}

.input-control {
  @apply h-full rounded-18 w-full border-0 bg-transparent px-10 text-center text-sm text-inherit outline-none;
}

.input-focus {
  @apply bg-white/86 text-black;
}

.btn {
  @apply absolute h-8 w-8 top-1.4 hover:bg-white rounded-2xl;
}

.btn-search {
  @apply right-1 text-blue;
}

.btn-toggle {
  @apply left-1 text-black;
}
</style>
