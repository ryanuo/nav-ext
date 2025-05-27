import { defineStore } from 'pinia'
import { useSearchStore } from '~/store/option/search'

export const useMarkStore = defineStore('showElement', () => {
  const maskLayerEnabled = ref<boolean>(false)
  const isInputActive = ref<boolean>(false)
  const isShowConsoleEnabled = ref<boolean>(false)
  const { setSearchQuery } = useSearchStore()

  const setMaskLayerEnabled = (value: boolean) => {
    maskLayerEnabled.value = value
  }

  const setInputActive = (value: boolean) => {
    maskLayerEnabled.value = value
    isInputActive.value = value
    isShowConsoleEnabled.value = !value
  }

  const setShowConsoleEnabled = (value: boolean) => {
    isShowConsoleEnabled.value = value
    isInputActive.value = !value
    maskLayerEnabled.value = value
  }

  const initStatus = () => {
    maskLayerEnabled.value = false
    isInputActive.value = false
    isShowConsoleEnabled.value = false
    setSearchQuery('')
  }

  return {
    maskLayerEnabled,
    isInputActive,
    isShowConsoleEnabled,
    setMaskLayerEnabled,
    setShowConsoleEnabled,
    setInputActive,
    initStatus,
  }
})
