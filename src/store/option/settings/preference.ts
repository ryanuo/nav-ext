import { defineStore } from 'pinia'
import { useReactiveStorage } from '~/composables/useReactiveStorage'

export const usePreferenceStore = defineStore('preference', () => {
  const { data: searchSuggestionEnabled } = useReactiveStorage<boolean>('searchSuggestionEnabled', true)
  const { data: isAutoFocusSearchBoxOnPageLoad } = useReactiveStorage<boolean>('isAutoFocusSearchBoxOnPageLoad', false)
  const { data: showDocking } = useReactiveStorage<boolean>('showDocking', false)
  const { data: animation } = useReactiveStorage<boolean>('animation', true)

  const reset = () => {
    searchSuggestionEnabled.value = true
    isAutoFocusSearchBoxOnPageLoad.value = false
    showDocking.value = false
    animation.value = true
  }

  return {
    searchSuggestionEnabled,
    isAutoFocusSearchBoxOnPageLoad,
    showDocking,
    animation,
    setSearchSuggestionEnabled: (v: boolean) => (searchSuggestionEnabled.value = v),
    setIsAutoFocusSearchBoxOnPageLoad: (v: boolean) => (isAutoFocusSearchBoxOnPageLoad.value = v),
    setShowDocking: (v: boolean) => (showDocking.value = v),
    setAnimation: (v: boolean) => (animation.value = v),
    reset,
  }
})
