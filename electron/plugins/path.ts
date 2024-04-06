import { join } from 'path';
import { ipcMain } from 'electron';
import { IpcMessage } from '../../src/enums/IpcMessage';

ipcMain.handle(IpcMessage.JOIN, (_, ...path: string[]) => join(...path));