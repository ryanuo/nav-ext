import { defineStore } from 'pinia'
import { useReactiveStorage } from '~/composables/useReactiveStorage'
import { initEngineData } from '~/constants/engine'

export const useSearchStore = defineStore('search', () => {
  const searchQuery = ref<string>('')
  const { data: engines } = useReactiveStorage<Engines[]>('engines', initEngineData)
  const { data: searchEngine } = useReactiveStorage<Engines>('searchEngine', engines.value[0])

  const setSearchEngine = (engine: Engines) => {
    searchEngine.value = engine
  }

  watch(() => engines.value, () => {
    setSearchEngine(engines.value[0])
  })

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
