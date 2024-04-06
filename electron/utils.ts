import { join } from 'node:path'
import { BrowserWindow } from 'electron'

export default {
  loadScreen(window: BrowserWindow, screen: string = ''): void {
    const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
  
    if (VITE_DEV_SERVER_URL) {
      const url = new URL(VITE_DEV_SERVER_URL)
      url.hash = screen
      window.loadURL(url.toString())
      return
    }
  
    window.loadFile(join(process.env.DIST ?? '', 'index.html'), { hash: screen })
  }
}