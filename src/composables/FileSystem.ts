import { AccessMode } from '@enum/AccessMode';
import { IpcMessage } from '@enum/IpcMessage';
import { Dir, OpenDirOptions, WriteFileOptions } from 'fs-extra';

export default function useFileSystem() {

  const writeFile = (path: string, data: string | NodeJS.ArrayBufferView, options?: WriteFileOptions) =>
    window.ipcRenderer.invoke(IpcMessage.WRITE_FILE, path, data, options);

  const readFile = (path: string, options?: BufferEncoding ) =>
    window.ipcRenderer.invoke(IpcMessage.READ_FILE, path, { encoding: options }) as Promise<string | NodeJS.ArrayBufferView>;

  const readDir = (path: string, options?: BufferEncoding ) =>
    window.ipcRenderer.invoke(IpcMessage.READ_DIR, path, { encoding: options }) as Promise<string[]|Buffer[]>;
  
  const openDir = (path: string, options?: OpenDirOptions ) =>
    window.ipcRenderer.invoke(IpcMessage.OPEN_DIR, path, options) as Promise<Dir>;
  
  const isDir = (path: string) => 
    window.ipcRenderer.invoke(IpcMessage.IS_DIRECTORY, path) as Promise<boolean>;

  const pathExists = (path: string) =>
    window.ipcRenderer.invoke(IpcMessage.PATH_EXISTS, path) as Promise<boolean>;

  const accessDir = (path: string, mode: AccessMode) =>
    window.ipcRenderer.invoke(IpcMessage.CHECK_ACCESS, path, mode) as Promise<boolean>;


  return {
    isDir,
    readDir,
    openDir,
    readFile,
    writeFile,
    accessDir,
    pathExists,
  }
}