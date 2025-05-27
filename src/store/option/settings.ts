import { defineStore } from 'pinia'

import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'
import type { LOCALESTRING } from '~/locales/i18n'
import i18n from '~/locales/i18n'

export const useSettingsStore = defineStore('settings', () => {
  // 使用 useWebExtensionStorage 持久化存储
  const { data: theme } = useWebExtensionStorage<string>('theme', 'auto')
  const { data: cover } = useWebExtensionStorage<string>('cover', 'https://wp.upx8.com/api.php')
  const { data: fontSize } = useWebExtensionStorage<string>('fontSize', '16')
  const { data: language } = useWebExtensionStorage<LOCALESTRING>('locale', 'zh-CN')
  const { data: animation } = useWebExtensionStorage<boolean>('animation', true)
  const { data: timezone } = useWebExtensionStorage<string>('timezone', 'Asia/Shanghai')
  const { data: weatherCity } = useWebExtensionStorage<string>('weatherCity', '北京')
  const { data: showWeather } = useWebExtensionStorage<boolean>('showWeather', true)
  const { data: showTemperature } = useWebExtensionStorage<boolean>('showTemperature', true)

  // 获取系统默认主题
  const systemTheme = computed(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )

  // 应用主题变更
  const applyTheme = (themeVal: string) => {
    document.documentElement.classList.toggle('dark', themeVal === 'dark')
    document.documentElement.classList.toggle('light', themeVal === 'light')
    if (themeVal === 'auto') {
      document.documentElement.classList.add(systemTheme.value)
    }
  }

  // 应用字体大小变更
  const applyFontSize = (size: string) => {
    document.documentElement.style.fontSize = `${size}px`
  }

  const applyLanguage = (lang: LOCALESTRING) => {
    i18n.global.locale.value = lang
    console.warn(`Language set to: ${lang}`)
  }

  // 动作定义（直接赋值即可，useWebExtensionStorage 会自动保存）
  const setTheme = (newTheme: string) => {
    theme.value = newTheme
    applyTheme(newTheme)
  }

  const setCover = (url?: string) => {
    cover.value = url || 'https://cn.bing.com/th?id=OHR.SunbeamsForest_ZH-CN5358008117_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
  }

  const setFontSize = (size: string) => {
    fontSize.value = size
    applyFontSize(size)
  }

  const setLanguage = (lang: LOCALESTRING) => {
    language.value = lang
  }

  const setAnimation = (enabled: boolean) => {
    animation.value = enabled
  }

  const setTimezone = (tz: string) => {
    timezone.value = tz
  }

  const setWeatherCity = (city: string) => {
    weatherCity.value = city
  }

  const setShowWeather = (show: boolean) => {
    showWeather.value = show
  }

  const setShowTemperature = (show: boolean) => {
    showTemperature.value = show
  }

  const resetAll = () => {
    // 重置所有设置为默认值
    theme.value = 'auto'
    cover.value = 'https://wp.upx8.com/api.php'
    fontSize.value = '16'
    language.value = 'zh-CN'
    animation.value = true
    timezone.value = 'Asia/Shanghai'
    weatherCity.value = '北京'
    showWeather.value = true
    showTemperature.value = true

    // 应用默认设置
    applyTheme(theme.value)
    applyLanguage(language.value)
    applyFontSize(fontSize.value)
  }

  watchEffect(() => {
    applyTheme(theme.value)
  })
  watchEffect(() => {
    applyFontSize(fontSize.value)
  })
  watchEffect(() => {
    applyLanguage(language.value)
  })

  return {
    // 状态
    theme,
    cover,
    fontSize,
    language,
    animation,
    timezone,
    weatherCity,
    showWeather,
    showTemperature,

    // 动作
    setTheme,
    setCover,
    setFontSize,
    setLanguage,
    setAnimation,
    setTimezone,
    setWeatherCity,
    setShowWeather,
    setShowTemperature,
    resetAll,
  }
})
