import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import scrollAnimation from './directives/scrollAnimation'

const app = createApp(App)

app.use(router)

app.directive('scrollAnimation', scrollAnimation)

app.mount('#app')
