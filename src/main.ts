import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import Content from './components/Content.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import App from './App.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [{ path: '/', name: 'home', component: Content }]
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
