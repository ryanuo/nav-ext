import { defineStore } from 'pinia'
import { initEngineData } from '~/constants/engine'

export const useSearchStore = defineStore('search', () => {
  const searchQuery = ref<string>('')
  const engines = reactive<Engines[]>(initEngineData)
  const searchEngine = ref<Engines>(initEngineData[0])

  const setSearchEngine = (engine: Engines) => {
    searchEngine.value = engine
  }

  function submit(value?: string) {
    const query = value?.trim() || searchQuery?.value?.trim()

    if (!query)
      return

    window.open(
      searchEngine.value.url + query,
      '_blank',
    )
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  return {
    searchQuery,
    searchEngine,
    engines,
    submit,
    setSearchQuery,
    setSearchEngine,
  }
})
