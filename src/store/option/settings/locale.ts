import { defineStore } from 'pinia'
import { useReactiveStorage } from '~/composables/useReactiveStorage'
import type { LOCALESTRING } from '~/locales/i18n'
import i18n from '~/locales/i18n'

export const useLocaleStore = defineStore('locale', () => {
  const { data: language } = useReactiveStorage<LOCALESTRING>('locale', 'zh-CN')

  const applyLanguage = (lang: LOCALESTRING) => {
    i18n.global.locale.value = lang
  }

  //   applyLanguage(language.value)
  // })

  const reset = () => {
    language.value = 'zh-CN'
    applyLanguage(language.value)
  }

  // 添加 apply 方法
  const apply = () => {
    watchEffect(() => {
      applyLanguage(language.value)
    })
  }

  return {
    language,
    setLanguage: (v: LOCALESTRING) => (language.value = v),
    reset,
    apply,
  }
})
