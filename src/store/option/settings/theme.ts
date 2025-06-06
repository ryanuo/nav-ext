import { defineStore } from 'pinia'
import { useReactiveStorage } from '~/composables/useReactiveStorage'

export const useThemeStore = defineStore('theme', () => {
  const { data: theme } = useReactiveStorage<string>('theme', 'auto')
  const { data: colorTheme } = useReactiveStorage<ColorTheme>('colorTheme', 'blue')

  const applyTheme = (themeVal: string) => {
    document.documentElement.classList.toggle('dark', themeVal === 'dark')
    document.documentElement.classList.toggle('light', themeVal === 'light')
    if (themeVal === 'auto') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      document.documentElement.classList.add(systemTheme)
    }
  }
  const applyColorScheme = (color: ColorTheme) => {
    document.documentElement.setAttribute('data-theme', color)
  }

  watchEffect(() => {
    applyTheme(theme.value)
  })
  watchEffect(() => {
    applyColorScheme(colorTheme.value)
  })

  const reset = () => {
    theme.value = 'auto'
    colorTheme.value = 'blue'
    applyTheme(theme.value)
    applyColorScheme(colorTheme.value)
  }

  return {
    theme,
    colorTheme,
    setTheme: (v: string) => (theme.value = v),
    setColorTheme: (v: ColorTheme) => (colorTheme.value = v),
    reset,
  }
})
