import { defineStore } from 'pinia'

import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'
import { coverRandomUrl, coverUrl, initCity } from '~/constants/settings'
import type { LOCALESTRING } from '~/locales/i18n'
import i18n from '~/locales/i18n'

export const useSettingsStore = defineStore('settings', () => {
  // 使用 useWebExtensionStorage 持久化存储
  const { data: theme } = useWebExtensionStorage<string>('theme', 'auto')
  const { data: cover } = useWebExtensionStorage<string>('cover', coverRandomUrl)
  const { data: language } = useWebExtensionStorage<LOCALESTRING>('locale', 'zh-CN')
  const { data: animation } = useWebExtensionStorage<boolean>('animation', true)
  const { data: timezone } = useWebExtensionStorage<string>('timezone', 'Asia/Shanghai')
  // 是否24小时制
  const { data: is24Hour } = useWebExtensionStorage<boolean>('is24Hour', true)
  const { data: showSeconds } = useWebExtensionStorage<boolean>('showSeconds', false)
  const { data: weatherCity } = useWebExtensionStorage<WeatherCity>('weatherCity', initCity)
  const { data: showWeather } = useWebExtensionStorage<boolean>('showWeather', false)

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

  const setIs24Hour = (is24: boolean) => {
    is24Hour.value = is24
  }
  // 设置是否显示秒钟
  const setShowSeconds = (sec: boolean) => {
    showSeconds.value = sec
  }
  // 动作定义（直接赋值即可，useWebExtensionStorage 会自动保存）
  const setTheme = (newTheme: string) => {
    theme.value = newTheme
    applyTheme(newTheme)
  }

  const setCover = (url?: string) => {
    cover.value = url || coverUrl
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

  const setWeatherCity = (city: WeatherCity) => {
    weatherCity.value = city
  }

  const setShowWeather = (show: boolean) => {
    showWeather.value = show
  }

  const resetAll = () => {
  // 重置所有设置为默认值
    theme.value = 'auto'
    cover.value = coverRandomUrl
    language.value = 'zh-CN'
    animation.value = true
    timezone.value = 'Asia/Shanghai'
    weatherCity.value = initCity
    showWeather.value = true
    is24Hour.value = true
    showSeconds.value = false

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
    is24Hour,
    theme,
    cover,
    language,
    animation,
    timezone,
    weatherCity,
    showWeather,
    showSeconds,

    // 动作
    setIs24Hour,
    setTheme,
    setCover,
    setLanguage,
    setAnimation,
    setTimezone,
    setWeatherCity,
    setShowWeather,
    resetAll,
    setShowSeconds,
  }
})
