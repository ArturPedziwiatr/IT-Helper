import { ipcMain } from 'electron'
import { IpcMessage } from '../../src/enums/IpcMessage';
import {
  ObjectEncodingOptions, PathLike, WriteFileOptions,
  readFileSync, writeFileSync, readdirSync, opendir,
  existsSync, statSync, OpenDirOptions, accessSync, constants
} from 'fs-extra'
import { AccessMode } from '../../src/enums/AccessMode';

ipcMain.handle(IpcMessage.READ_DIR,
  (_event, path: PathLike, options: ObjectEncodingOptions) =>
    readdirSync(path, options)
)

ipcMain.handle(IpcMessage.OPEN_DIR,
  (_event, path: PathLike, options?: OpenDirOptions ) =>
    opendir(path, options)
)

ipcMain.handle(IpcMessage.READ_FILE,
  (_event, path: PathLike, options: ObjectEncodingOptions) =>
    readFileSync(path, options)
)

ipcMain.handle(IpcMessage.WRITE_FILE,
  (_event, path: PathLike, data: string | NodeJS.ArrayBufferView, options: WriteFileOptions) => 
    writeFileSync(path, data, options)
)

ipcMain.handle(IpcMessage.PATH_EXISTS,
  (_event, path: PathLike) => existsSync(path)
)

ipcMain.handle(IpcMessage.IS_DIRECTORY,
  (_event, path: PathLike) => statSync(path).isDirectory()
)

ipcMain.handle(IpcMessage.CHECK_ACCESS,
  (_event, path: PathLike, mode: AccessMode) => accessSync(path, convertAccesModeToInt(mode))
)

const convertAccesModeToInt = (mode: AccessMode) => {
  switch (mode) {
    case AccessMode.READ:
      console.log(constants.R_OK)
      return constants.R_OK
    case AccessMode.WRITE:
      return constants.W_OK
    default:
      return 0
  }
}