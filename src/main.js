import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import route from './route'
import { createPinia } from 'pinia'
import VueMq from 'vue-mq';


const pinia=createPinia()
const app = createApp(App)

app.use(pinia)
app.use(route)
app.mount('#app')
