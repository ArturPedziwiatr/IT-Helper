import { ref } from 'vue';
import useFileSystem from './FileSystem';
import { IAppSettings } from '@interface/IAppSettings';
import * as settings from '../../app-settings.json'

const appSettings = ref<IAppSettings>(settings)

export default function useAppSettings() {
  const { writeFile } = useFileSystem()

  const saveSettings = async () => {
    await writeFile('app-settings.json', JSON.stringify(appSettings.value, null, 2), { flag: 'w' })
  }

  return {
    appSettings,
    saveSettings,
  }
}