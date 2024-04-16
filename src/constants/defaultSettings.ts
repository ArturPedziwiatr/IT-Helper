export const SETTINGS: IAppSettings = {
  main: {
    theme: 'dark',
    color: '#f8526e',
  },
  projectManager: {
    projectPath: 'E:\\Projects',
    exec: 'code',
    adminMode: false,
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

export interface IMain {
  theme: string;
  color: string;
}

export interface IProjectManager {
  exec: string;
  projectPath: string;

  depth: number;
  
  adminMode: boolean;
  
  projectTypes: string[];
  ignorePaths: string[];
}

export interface IAppSettings {
  main: IMain;
  projectManager: IProjectManager;
}