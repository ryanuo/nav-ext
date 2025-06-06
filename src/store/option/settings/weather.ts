import { defineStore } from 'pinia'
import { useReactiveStorage } from '~/composables/useReactiveStorage'
import { initCity } from '~/constants/settings'

export const useWeatherStore = defineStore('weather', () => {
  const { data: weatherCity } = useReactiveStorage<WeatherCity>('weatherCity', initCity)
  const { data: showWeather } = useReactiveStorage<boolean>('showWeather', false)
  const { data: weatherTheme } = useReactiveStorage<'1' | '2'>('weatherTheme', '1')

  const reset = () => {
    weatherCity.value = initCity
    showWeather.value = false
    weatherTheme.value = '1'
  }

  return {
    weatherCity,
    showWeather,
    weatherTheme,
    setWeatherCity: (v: WeatherCity) => (weatherCity.value = v),
    setShowWeather: (v: boolean) => (showWeather.value = v),
    setWeatherTheme: (v: '1' | '2') => (weatherTheme.value = v),
    reset,
  }
})
