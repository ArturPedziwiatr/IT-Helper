export enum IpcMessage {
  WRITE_FILE = 'write-file',
  READ_FILE = 'read-file',
  READ_DIR = 'read-dir',
  PATH_EXISTS = 'path-exists',
  IS_DIRECTORY = 'is-directory',

  JOIN = 'join',

  CHANGE_SHORTCUT_FOR_ROUTE = 'set-shortcut-for-route',

  CLOSE_DIALOG = 'close-dialog',
}