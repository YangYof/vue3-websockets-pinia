// Utilities
import { createPinia, type Pinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 創建 pinia
const pinia: Pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

import useSoctet from './stores/useSoctet'

export { useSoctet }
