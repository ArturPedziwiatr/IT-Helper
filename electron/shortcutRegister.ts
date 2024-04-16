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

  ipcMain.on(IpcMessage.CLOSE_DIALOG, (_event, route: Routes) =>  {
    const dialog = dialogManager.get(route);
    if (dialog && dialog.isVisible()) {
      dialog.hide();
    }
  })

  const addOrChangeRegister = (route: Routes, alias: string) => {
    const shortcut = shortcutMap.get(route)

    if (shortcut && globalShortcut.isRegistered(shortcut))
      globalShortcut.unregister(shortcut)

    globalShortcut.register(alias, () => {
      let dialog = dialogManager.get(route)

      
      if (!dialog) {
        dialog = new BrowserWindow({
            width: 800,
            height: 500,
            parent: mainWindow,
            modal: true,
            show: false,
            frame: true,
            alwaysOnTop: true,
            webPreferences: {
              disableHtmlFullscreenWindowResize: false,
              preload: path.join(__dirname, 'preload.js'),
            }
        });
    
        utils.loadScreen(dialog, route)
        dialogManager.set(route, dialog)
        shortcutMap.set(route, alias)
      }

      if (!dialog.isDestroyed()) {
        if (dialog.isVisible())
          return dialog.hide();
        return dialog.show();
      }
    })
  }

  addOrChangeRegister(Routes.PROJECT_MANAGER, 'CmdOrCtrl+O')
}
