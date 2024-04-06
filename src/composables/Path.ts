import { IpcMessage } from '@enum/IpcMessage';

export default function usePath() {
  const join = async (...paths: string[]) =>
    window.ipcRenderer.invoke(IpcMessage.JOIN, ...paths)

  return {
    join,
  }
}