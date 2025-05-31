import { defineStore } from 'pinia'
import { useSearchStore } from '~/store/option/search'

export const useMarkStore = defineStore('showElement', () => {
  const maskLayerEnabled = ref<boolean>(false)
  const isInputActive = ref<boolean>(false)
  const isShowWidget = ref<boolean>(false)
  const { setSearchQuery } = useSearchStore()

  const setMaskLayerEnabled = (value: boolean) => {
    maskLayerEnabled.value = value
  }

  const setInputActive = (value: boolean) => {
    maskLayerEnabled.value = value
    isInputActive.value = value
    isShowWidget.value = !value
  }

  const setShowWidget = (value: boolean) => {
    isShowWidget.value = value
    isInputActive.value = !value
    maskLayerEnabled.value = value
  }

  const initStatus = () => {
    maskLayerEnabled.value = false
    isInputActive.value = false
    isShowWidget.value = false
    setSearchQuery('')
  }

  return {
    maskLayerEnabled,
    isInputActive,
    isShowWidget,
    setMaskLayerEnabled,
    setShowWidget,
    setInputActive,
    initStatus,
  }
})
