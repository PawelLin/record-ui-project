import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import recordUi from '../lib'
// import recordUi from '../dist/index.mjs'

const app = createApp(App)

app.use(recordUi)

app.mount('#app')
