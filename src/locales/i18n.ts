import { createI18n } from 'vue-i18n'

// 导入语言文件
import en from './en/messages.json'
import zh from './zh/messages.json'
import { useReactiveStorage } from '~/composables/useReactiveStorage'

const locale = useReactiveStorage<string>('locale', 'zh-CN')

const messages = {
  'en-US': en,
  'zh-CN': zh,
}

const i18n = createI18n({
  legacy: false, // 让vue-i18n使用Composition API模式
  locale: locale.data.value,
  fallbackLocale: 'zh-CN',
  messages,
})
export type LOCALESTRING = keyof typeof messages
export default i18n
