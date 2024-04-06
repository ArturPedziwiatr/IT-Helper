import { pathExistsSync, writeFile } from 'fs-extra'

export const defaultSettings = {
  projectPath: 'asd',
  projectTypes: ['package.json']
}

const appSettingsPath = 'app-settings.json'

if (!pathExistsSync(appSettingsPath)) {
  writeFile(appSettingsPath, JSON.stringify(defaultSettings, null, 2), { flag: 'w' })
}
