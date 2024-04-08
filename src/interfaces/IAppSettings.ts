export interface IProjectManager {
  projectPath: string;
  depth: number;
  projectTypes: string[];
  ignorePaths: string[];
}

export interface IAppSettings {
  projectManager: IProjectManager;
}