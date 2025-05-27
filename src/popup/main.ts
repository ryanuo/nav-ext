import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './Popup.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'
import i18n from '~/locales/i18n'

const pinia = createPinia()

const app = createApp(App)
setupApp(app)
app.use(pinia)
app.use(i18n)
app.mount('#app')
