/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    DIST: string
    VITE_PUBLIC: string
  }
}


interface Window {
  electron: {
    ipcRenderer: import('electron').IpcRenderer,
  }
}
