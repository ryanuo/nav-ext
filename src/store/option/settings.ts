import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const cover = ref<string>('https://wp.upx8.com/api.php')
  const setCover = (url?: string) => {
    cover.value = url || 'https://cn.bing.com/th?id=OHR.SunbeamsForest_ZH-CN5358008117_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
  }

  return {
    cover,
    setCover,
  }
})
