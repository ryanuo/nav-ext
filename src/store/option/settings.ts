import { defineStore } from 'pinia'

import { useReactiveStorage } from '~/composables/useReactiveStorage'
import { coverRandomUrl, coverUrl, initCity } from '~/constants/settings'
import type { LOCALESTRING } from '~/locales/i18n'
import i18n from '~/locales/i18n'

export const useSettingsStore = defineStore('settings', () => {
  // 使用 useReactiveStorage 持久化存储
  const { data: theme } = useReactiveStorage<string>('theme', 'auto')
  const { data: cover } = useReactiveStorage<string>('cover', coverRandomUrl)
  const { data: language } = useReactiveStorage<LOCALESTRING>('locale', 'zh-CN')
  const { data: animation } = useReactiveStorage<boolean>('animation', true)
  // 时间配置
  const { data: timezone } = useReactiveStorage<string>('timezone', 'Asia/Shanghai')
  const { data: is24Hour } = useReactiveStorage<boolean>('is24Hour', true)
  const { data: showSeconds } = useReactiveStorage<boolean>('showSeconds', false)
  const { data: showDateWeek } = useReactiveStorage<boolean>('showDateWeek', false)
  // 天气配置
  const { data: weatherCity } = useReactiveStorage<WeatherCity>('weatherCity', initCity)
  const { data: showWeather } = useReactiveStorage<boolean>('showWeather', false)
  // 偏好设置
  const { data: searchSuggestionEnabled } = useReactiveStorage<boolean>('searchSuggestionEnabled', true)
  const { data: isAutoFocusSearchBoxOnPageLoad } = useReactiveStorage<boolean>('isAutoFocusSearchBoxOnPageLoad', false)

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

  const setTimezone = (tz: string) => {
    timezone.value = tz
  }

  const setShowDateWeek = (show: boolean) => {
    showDateWeek.value = show
  }

  // 动作定义（直接赋值即可，useReactiveStorage 会自动保存）
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

  const setWeatherCity = (city: WeatherCity) => {
    weatherCity.value = city
  }

  const setShowWeather = (show: boolean) => {
    showWeather.value = show
  }

  // 偏好设置
  const setSearchSuggestionEnabled = (enabled: boolean) => {
    searchSuggestionEnabled.value = enabled
  }
  const setIsAutoFocusSearchBoxOnPageLoad = (enabled: boolean) => {
    isAutoFocusSearchBoxOnPageLoad.value = enabled
  }

  const resetAll = () => {
    // 重置所有设置为默认值
    theme.value = 'auto'
    cover.value = coverRandomUrl
    language.value = 'zh-CN'
    animation.value = true
    // 时区设置
    timezone.value = 'Asia/Shanghai'
    is24Hour.value = true
    showSeconds.value = false
    showDateWeek.value = false
    // 天气设置
    showWeather.value = true
    weatherCity.value = initCity
    // 偏好设置
    searchSuggestionEnabled.value = true
    isAutoFocusSearchBoxOnPageLoad.value = false

    // 应用默认设置
    applyTheme(theme.value)
    applyLanguage(language.value)
  }

  watchEffect(() => {
    applyTheme(theme.value)
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
    is24Hour,
    showSeconds,
    timezone,
    showDateWeek,
    weatherCity,
    showWeather,
    searchSuggestionEnabled,
    isAutoFocusSearchBoxOnPageLoad,

    // 动作
    setTheme,
    setCover,
    setLanguage,
    setAnimation,
    setIs24Hour,
    setTimezone,
    setShowSeconds,
    setShowDateWeek,
    setWeatherCity,
    setShowWeather,
    setSearchSuggestionEnabled,
    setIsAutoFocusSearchBoxOnPageLoad,
    resetAll,
  }
})
