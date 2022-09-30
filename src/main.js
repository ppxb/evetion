import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuesax from 'vuesax3'

import router from './router'
import App from './App.vue'

import AppIcon from './components/AppIcon.vue'
import 'virtual:svg-icons-register'

import 'vuesax3/dist/vuesax.css'
import './global.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(vuesax)

app.component('app-icon', AppIcon)

app.mount('#app')
