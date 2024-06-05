import './assets/main.css'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import App from './App.vue'

const vue = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

vue.use(pinia)
vue.mount('#app')
