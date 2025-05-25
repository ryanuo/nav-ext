import { defineStore } from 'pinia'

export const useMarkStore = defineStore('showElement', () => {
  const isMark = ref<boolean>(false)
  const isClickInput = ref<boolean>(false)
  const isShowNavs = ref<boolean>(false)

  const setMark = (value: boolean) => {
    isMark.value = value
  }

  const setClickInput = (value: boolean) => {
    isMark.value = value
    isClickInput.value = value
    isShowNavs.value = !value
  }

  const setShowNavs = (value: boolean) => {
    isShowNavs.value = value
    isClickInput.value = !value
    isMark.value = value
  }

  const initStatus = () => {
    isMark.value = false
    isClickInput.value = false
    isShowNavs.value = false
  }

  return {
    isMark,
    isClickInput,
    isShowNavs,
    setMark,
    setShowNavs,
    setClickInput,
    initStatus,
  }
})
