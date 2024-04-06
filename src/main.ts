import './style.css'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'

createApp(App).use(router).mount('#app').$nextTick(() => {
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
