import { computed, ref } from 'vue';
import { SettingsDrawer } from '@/enums/SettingsDrawer';
import CustomInput from '@/components/elements/CustomInput.vue';
import MainSettings from '@/components/settings/MainSettings.vue';


const activeDrawer = ref(SettingsDrawer.MAIN)

export default function useSettingsDrawer() {
  const setActiveDrawer = (drawer: SettingsDrawer) => activeDrawer.value = drawer

  const getView = computed(() => {
    switch (activeDrawer.value) {
      case SettingsDrawer.PROJECT_MANAGER:
        return CustomInput
      default:
        return MainSettings
    }
  })
  
  return {
    getView,
    activeDrawer,
    setActiveDrawer,
  }
}