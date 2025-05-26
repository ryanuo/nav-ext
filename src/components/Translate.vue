<script lang="ts" setup>
import hotkeys from 'hotkeys-js'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '~/store/option/search'

const searchStore = useSearchStore()
const { searchEngine, searchQuery } = storeToRefs(searchStore)

function clickTranslate() {
  if (searchQuery.value && searchEngine.value.translateUrl) {
    window.open(searchEngine.value.translateUrl + searchQuery.value, '_blank')
  }
}

onMounted(() => {
  hotkeys('option+enter', (event) => {
    clickTranslate()
    event.preventDefault()
  })
})

onUnmounted(() => {
  hotkeys.unbind('option+enter')
})
</script>

<template>
  <li
    v-if="searchEngine.translateUrl"
    class="cursor-pointer px-4 py-2 transition-colors"
    hover="bg-gray-100/40 text-gray-800"
    flex="~ justify-between items-center"
    @click.stop="clickTranslate"
  >
    <div flex="~ items-center">
      <span class="i-icon-park-outline-translate" />
      <span>快捷翻译：{{ searchQuery }}</span>
    </div>
    <div flex="~ items-center">
      <span class="i-ci-option mr-1" /> Enter
    </div>
  </li>
</template>
