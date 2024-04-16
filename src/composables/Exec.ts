import { IpcMessage } from '@/enums/IpcMessage';
import { useAppSetingsStore } from '@store/AppSettings.store';

export default function useExec() {
  const main = useAppSetingsStore().getProjectManager;
  const exec = (command: string) => {
    let execCommand;
    if (main?.adminMode) {
      if (process.platform === 'win32') {
        execCommand = `runas /user:Administrator "${command}"`;
      } else if (process.platform === 'linux' || process.platform === 'darwin') {
        execCommand = `sudo "${command}"`;
      }
    } else {
      execCommand = command;
    }
    console.log(execCommand);
    window.ipcRenderer.invoke(IpcMessage.COMMAND_EXEC, execCommand);
  }

  
  return {
    exec,
  }
}