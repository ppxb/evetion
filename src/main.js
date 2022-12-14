import { createApp } from 'vue'

import router from './router'
import store from './store'
import App from './App.vue'

import AppIcon from './components/AppIcon.vue'
import 'virtual:svg-icons-register'

import './global.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.component('app-icon', AppIcon)

app.mount('#app')
