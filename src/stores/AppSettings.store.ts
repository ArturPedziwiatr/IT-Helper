import { defineStore } from 'pinia';
import { IMain, IProjectManager, SETTINGS } from '@constant/defaultSettings';
import { IpcMessage } from '@enum/IpcMessage';

export const useAppSetingsStore = defineStore({
  id: 'app-settings',
  state: () => ({
    main: <IMain|null> null,
    projectManager: <IProjectManager|null> null,
  }),
  getters: {
    getMain: (state) => state.main ?? SETTINGS.main,
    getProjectManager: (state) => state.projectManager ?? SETTINGS.projectManager,
  },
  actions: {
    async initialize() {
      this.main = await this.getElectronSettings('main') as IMain
      this.projectManager = await this.getElectronSettings('projectManager') as IProjectManager
    },

    // saveSettings() {
    //   this.fs.writeFile(
    //     this.appSettingsPath,
    //     JSON.stringify(this.settings, null, 2),
    //     { flag: 'w' }
    //   )
    // },

    // getProjectManagerSettings(): IProjectManager {
    //   if (settings) {
    //     return settings.projectManager as IProjectManager;
    //   }
    //   return this.defaultSettings.projectManager
    // },

    // getMainSettings(): IMain {
    //   if (settings) {
    //     return settings.main as IMain;
    //   }
    //   return this.defaultSettings.main
    // },

    async setElectronSettings(key: string, value: any) {
      await window.ipcRenderer.invoke(IpcMessage.SET_CONFIG, key, value)
    },

    async getElectronSettings(key: string) {
      return await window.ipcRenderer.invoke(IpcMessage.GET_CONFIG, key)
    },
  }
})