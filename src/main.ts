import './style.css'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAppSetingsStore } from '@store/AppSettings.store'
import { useFolderStructureStore } from '@store/FolderStructure.store'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill } from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill);

const pinia = createPinia()
const init = async () => {
  await useAppSetingsStore(pinia).initialize()
  await useFolderStructureStore(pinia).initialize()

  createApp(App).component("v-icon", OhVueIcon).use(router).use(pinia).mount('#app').$nextTick(async () => {
    // console.log('settings', settings)
    // const settings = useAppSetingsStore(pinia)
    // await settings.initialize()
    // const folderStructure = useFolderStructureStore(pinia);
    // await folderStructure.initialize();
  })
}

init()
