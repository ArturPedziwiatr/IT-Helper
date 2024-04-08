import { IAppSettings } from '@interface/IAppSettings';

export const SETTINGS: IAppSettings = {
  projectManager: {
    projectPath: 'E:\\Projects',
    depth: 2,
    projectTypes: [
      "package.json"
    ],
    ignorePaths: [
      'node_modules',
      '\\\\gsdpl-dev-01\\RestApiTmp\\'
    ]
  }
}