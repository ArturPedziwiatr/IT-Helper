import { ipcMain } from 'electron';
import settings from 'electron-settings';
import { IpcMessage } from '../../src/enums/IpcMessage';

const set = (key: string, value: any) => {
  if (!settings.hasSync(key)) {
    settings.setSync(key, value)
  }
}

ipcMain.handle(IpcMessage.SET_CONFIG, (_, key: string, value: any) => settings.setSync(key, value));
ipcMain.handle(IpcMessage.GET_CONFIG, (_, key?: string) => key ? settings.getSync(key) : settings.getSync());

set('main.theme', 'dark')
set('main.color', '#f8526e')
set('main.autoLaunch', true)

settings.setSync('projectManager.projectPath', 'E:\\Projects')
set('projectManager.projectPath', '/home/apedziwiatr/optimus/Projects')
set('projectManager.exec', 'code')
set('projectManager.adminMode', false)
set('projectManager.depth', 2)
set('projectManager.projectTypes', ['package.json'])
set('projectManager.ignorePaths', ['node_modules', '\\\\gsdpl-dev-01\\RestApiTmp\\'])