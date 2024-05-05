import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '../vue/App.vue'
import router from './router'
import vuetify from './vuetify'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')