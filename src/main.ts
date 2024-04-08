import './style.css'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useFolderStructureStore } from '@store/FolderStructure.store'

const pinia = createPinia()
useFolderStructureStore(pinia).initialize()

createApp(App).use(router).use(pinia).mount('#app').$nextTick(() => {
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})