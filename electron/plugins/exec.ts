import { ipcMain } from 'electron'
import { IpcMessage } from '../../src/enums/IpcMessage';
import { execSync } from 'child_process';

ipcMain.handle(IpcMessage.COMMAND_EXEC,
  (_event, command: string) =>
    execSync(command)
)
