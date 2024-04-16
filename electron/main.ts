import utils from './utils'
import path from 'node:path'
import { app, BrowserWindow } from 'electron'
import shortcutRegister from './shortcutRegister'
import AutoLunch from 'auto-launch';
import electronSettings from 'electron-settings'

import './plugins/exec'
import './plugins/path'
import './plugins/settings'
import './plugins/fs-extra'

process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null

const appLauncher = new AutoLunch({
  name: 'MyApp',
  path: app.getPath('exe'),
})

if (electronSettings.getSync('main.autoLaunch')) {
  appLauncher.isEnabled().then(isEnabled => {
    if (!isEnabled) appLauncher.enable();
  });
} else {
  appLauncher.disable();
}

function createWindow() {
  win = new BrowserWindow({
    show: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  utils.loadScreen(win)
  shortcutRegister(win)
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

