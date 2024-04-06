import { ipcMain } from 'electron'
import { IpcMessage } from '../../src/enums/IpcMessage';
import { existsSync, readdir, readFile, writeFile, stat } from 'fs'
import { ObjectEncodingOptions, PathLike, WriteFileOptions } from 'fs-extra'


ipcMain.on(IpcMessage.READ_DIR,
  (event, path: PathLike, options: ObjectEncodingOptions) =>
    readdir(path, options, (err, dirs) =>
      err ? event.sender.send('error', err) : event.sender.send('ready', dirs)
    )
)

ipcMain.on(IpcMessage.READ_FILE,
  (event, path: PathLike, options: ObjectEncodingOptions) =>
    readFile(path, options, (err, files) =>
      err ? event.sender.send('error', err) : event.sender.send('ready', files)
    )
)

ipcMain.on(IpcMessage.WRITE_FILE,
  (event, path: PathLike, data: string | NodeJS.ArrayBufferView, options: WriteFileOptions) => 
    writeFile(path, data, options, (err) =>
      err ? event.sender.send('error', err) : event.sender.send('ready', true)
    )
)

ipcMain.on(IpcMessage.PATH_EXISTS,
  (event, path: PathLike) => event.sender.send('ready', existsSync(path))
)

ipcMain.on(IpcMessage.IS_DIRECTORY,
  (event, path: PathLike) => stat(path, (err, stats) => 
    err ? event.sender.send('error', false) : event.sender.send('ready', stats.isDirectory())
  )
)