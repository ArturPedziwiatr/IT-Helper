import { IpcMessage } from '@enum/IpcMessage';
import { WriteFileOptions } from 'fs-extra';

export default function useFileSystem() {

  const writeFile = (
    path: string, data: string | NodeJS.ArrayBufferView, options?: WriteFileOptions
  ) => sendIpcMessage(IpcMessage.WRITE_FILE, path, data, options);

  const readFile = (
    path: string, options?: BufferEncoding | null | undefined
  ) => sendIpcMessage(IpcMessage.READ_FILE, path, { encoding: options });

  const readDir = (
    path: string, options?: BufferEncoding | null | undefined
  ): Promise<string[]|Buffer[]> => sendIpcMessage(IpcMessage.READ_DIR, path, { encoding: options }) as Promise<string[]|Buffer[]>;
  
  const isDir = (path: string): Promise<boolean> => 
    sendIpcMessage(IpcMessage.IS_DIRECTORY, path) as Promise<boolean>;

  const pathExists = (path: string): Promise<boolean> => sendIpcMessage(IpcMessage.PATH_EXISTS, path) as Promise<boolean>;
  
  const sendIpcMessage = (channel: IpcMessage, ...args: any[]) =>
    new Promise((resolve, reject) => {
      window.ipcRenderer.send(channel, ...args)
      window.ipcRenderer.on('ready', (_event, ready) => resolve(ready))
      window.ipcRenderer.on('error', (_event, error) => reject(error))
    });

  return {
    isDir,
    readDir,
    readFile,
    writeFile,
    pathExists,
  }
}