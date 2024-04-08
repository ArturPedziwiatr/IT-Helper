import utils from './utils';
import path from 'node:path'
import { Routes } from '../src/enums/Routes';
import { IpcMessage } from '../src/enums/IpcMessage';
import { BrowserWindow, globalShortcut, ipcMain } from 'electron';

export default function shortcutRegister(mainWindow: BrowserWindow) {
  const shortcutMap = new Map<string, string>()
  const dialogManager = new Map<string, BrowserWindow>()

  ipcMain.on(IpcMessage.CHANGE_SHORTCUT_FOR_ROUTE, (_event, routes: Routes, shortcut: string) => {
    addOrChangeRegister(routes, shortcut)
  })

  ipcMain.on(IpcMessage.CLOSE_DIALOG, (_event, route: Routes) => dialogManager.get(route)?.close())

  const addOrChangeRegister = (route: Routes, alias: string) => {
    const shortcut = shortcutMap.get(route)

    if (shortcut && globalShortcut.isRegistered(shortcut))
      globalShortcut.unregister(shortcut)

    globalShortcut.register(alias, () => {

      const projectManagerDialog = new BrowserWindow({
          width: 800,
          height: 500,
          parent: mainWindow,
          modal: true,
          show: false,
          frame: false,
          alwaysOnTop: true,
          webPreferences: {
            disableHtmlFullscreenWindowResize: false,
            preload: path.join(__dirname, 'preload.js'),
          }
      });
  
      utils.loadScreen(projectManagerDialog, route)
      projectManagerDialog.once('ready-to-show', () => projectManagerDialog?.show());
      shortcutMap.set(route, alias)
      dialogManager.set(route, projectManagerDialog)
    })
  }

  addOrChangeRegister(Routes.PROJECT_MANAGER, 'CmdOrCtrl+O')
}
