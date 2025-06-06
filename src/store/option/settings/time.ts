import { defineStore } from 'pinia'
import { useReactiveStorage } from '~/composables/useReactiveStorage'

export const useTimeStore = defineStore('time', () => {
  const { data: timezone } = useReactiveStorage<string>('timezone', 'Asia/Shanghai')
  const { data: is24Hour } = useReactiveStorage<boolean>('is24Hour', true)
  const { data: showSeconds } = useReactiveStorage<boolean>('showSeconds', false)
  const { data: showDateWeek } = useReactiveStorage<boolean>('showDateWeek', false)

  const reset = () => {
    timezone.value = 'Asia/Shanghai'
    is24Hour.value = true
    showSeconds.value = false
    showDateWeek.value = false
  }

  return {
    timezone,
    is24Hour,
    showSeconds,
    showDateWeek,
    setTimezone: (v: string) => (timezone.value = v),
    setIs24Hour: (v: boolean) => (is24Hour.value = v),
    setShowSeconds: (v: boolean) => (showSeconds.value = v),
    setShowDateWeek: (v: boolean) => (showDateWeek.value = v),
    reset,
  }
})
