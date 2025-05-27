import type { App } from 'vue'
import { createPinia } from 'pinia'
import i18n from '~/locales/i18n'

export function setupApp(app: App) {
  const pinia = createPinia()

  // Inject a globally available `$app` object in template
  app.config.globalProperties.$app = {
    context: '',
  }

  // Provide access to `app` in script setup with `const app = inject('app')`
  app.provide('app', app.config.globalProperties.$app)

  app.use(pinia)
  app.use(i18n)
  // Here you can install additional plugins for all contexts: popup, options page and content-script.
  // example: app.use(i18n)
  // example excluding content-script context: if (context !== 'content-script') app.use(i18n)
}
