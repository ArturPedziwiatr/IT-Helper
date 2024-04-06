import { IpcMessage } from '@enum/IpcMessage'
import { Routes } from '@enum/Routes'


export default function useShortcutManager() {
  const setShortcut = (route: Routes, shortcut: string) => {
    window.ipcRenderer.send(IpcMessage.CHANGE_SHORTCUT_FOR_ROUTE, route, shortcut)
  }

  const sendAction = (action: IpcMessage) => window.ipcRenderer.invoke(action);

  return {
    sendAction,
    setShortcutForProjectManager: (shortcut: string) => setShortcut(Routes.PROJECT_MANAGER, shortcut),
  }
}