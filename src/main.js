import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import App from './App.vue'

import AppIcon from './components/AppIcon.vue'
import 'virtual:svg-icons-register'

import './global.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.component('app-icon', AppIcon)

app.mount('#app')
