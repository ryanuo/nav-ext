import { defineStore } from 'pinia'

import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'
import type { LOCALESTRING } from '~/locales/i18n'
import i18n from '~/locales/i18n'

export const useSettingsStore = defineStore('settings', () => {
  // 使用 useWebExtensionStorage 持久化存储
  const { data: theme } = useWebExtensionStorage<string>('theme', 'auto')
  const { data: cover } = useWebExtensionStorage<string>('cover', 'https://wp.upx8.com/api.php')
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
    cover.value = url || 'https://cdn-hsyq-static.shanhutech.cn/bizhi/staticwp/202405/e7aa9e7dc0a1a3f9877967c316eaf909--1163747198.jpg'
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
    language.value = 'zh-CN'
    animation.value = true
    timezone.value = 'Asia/Shanghai'
    weatherCity.value = '北京'
    showWeather.value = true
    showTemperature.value = true

    // 应用默认设置
    applyTheme(theme.value)
    applyLanguage(language.value)
  }

  watchEffect(() => {
    applyTheme(theme.value)
  })
  watchEffect(() => {
  })
  watchEffect(() => {
    applyLanguage(language.value)
  })

  return {
    // 状态
    theme,
    cover,
    language,
    animation,
    timezone,
    weatherCity,
    showWeather,
    showTemperature,

    // 动作
    setTheme,
    setCover,
    setLanguage,
    setAnimation,
    setTimezone,
    setWeatherCity,
    setShowWeather,
    setShowTemperature,
    resetAll,
  }
})
