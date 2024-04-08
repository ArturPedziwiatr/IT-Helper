import { defineStore } from 'pinia';
import useFileSystem from '@composable/FileSystem';
import * as settings from '../../app-settings.json';
import { SETTINGS } from '@constant/defaultSettings';
import { IAppSettings, IProjectManager } from '@interface/IAppSettings';
import { merge } from 'ts-deepmerge'


export const useAppSetingsStore = defineStore({
  id: 'app-settings',
  state: () => ({
    appSettingsPath: 'app-settings.json',
    fs: useFileSystem(),
    settings: <IAppSettings | null> null,
    defaultSettings: <IAppSettings> SETTINGS,
  }),
  actions: {
    async initialize() {
      if (!await this.fs.pathExists(this.appSettingsPath)) {
        this.fs.writeFile(this.appSettingsPath, JSON.stringify(this.defaultSettings, null, 2), { flag: 'w' })
        return
      }
      const def = await this.fs.readFile(this.appSettingsPath, 'utf8')
      if (typeof def === 'string')
        this.fs.writeFile(
          this.appSettingsPath,
          JSON.stringify(merge(this.defaultSettings, JSON.parse(def)), null, 2),
        { flag: 'w' }
      )
    },

    getProjectManagerSettings(): IProjectManager {
      if (settings) {
        return settings.projectManager;
      }
      this.initialize()
      return this.defaultSettings.projectManager
    },
  }
})