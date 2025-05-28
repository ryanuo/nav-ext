<script lang="ts" setup>
import hotkeys from 'hotkeys-js'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '~/store/option/search'

const searchStore = useSearchStore()
const { t } = useI18n()
const { searchEngine, searchQuery } = storeToRefs(searchStore)

function clickTranslate() {
  if (searchQuery.value && searchEngine.value.translateUrl) {
    window.open(searchEngine.value.translateUrl + searchQuery.value, '_blank')
  }
}

onMounted(() => {
  hotkeys('option+enter', clickTranslate)
})

onUnmounted(() => {
  hotkeys.unbind('option+enter', clickTranslate)
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
      <span>{{ t('translate.quick') }}：{{ searchQuery }}</span>
    </div>
    <div flex="~ items-center">
      <span class="i-ci-option mr-1" /> Enter
    </div>
  </li>
</template>
