import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import NavigationBar from '../src/components/NavigationBar.vue'

createApp(App).use(router).component('navbar' ,NavigationBar).mount('#app')
