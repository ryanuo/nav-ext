import { useThemeStore } from './theme'
import { useLocaleStore } from './locale'
import { useCoverStore } from './cover'
import { useTimeStore } from './time'
import { useWeatherStore } from './weather'
import { usePreferenceStore } from './preference'

export * from './theme'
export * from './locale'
export * from './cover'
export * from './time'
export * from './weather'
export * from './preference'

// 一键重置所有设置
export function resetAllOptions() {
  useThemeStore().reset()
  useLocaleStore().reset()
  useCoverStore().reset()
  useTimeStore().reset()
  useWeatherStore().reset()
  usePreferenceStore().reset()
}

// 添加 applyAllOptions 方法
export function applyAllOptions() {
  useThemeStore().apply()
  useLocaleStore().apply()
  useCoverStore().apply()
}
