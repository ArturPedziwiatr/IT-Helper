import { TreeNode } from '@Tree';
import { defineStore } from 'pinia';
import usePath from '@composable/Path';
import useFileSystem from '@composable/FileSystem';
import { IFolderStructure } from '@interface/IFolderStructure';
import { useAppSetingsStore } from '@store/AppSettings.store';


export const useFolderStructureStore = defineStore({
  id: 'folder-structure',
  state: () => ({
    folder: new TreeNode({ path: '', name: '', ifProject: false }),
    settings: useAppSetingsStore().getProjectManagerSettings(),
    fs: useFileSystem(),
    path: usePath(),
    pending: false
  }),
  getters: {
    getFolder: (state) => state.folder,
    getPending: (state) => state.pending,
  },
  actions: {
    async initialize() {
      try {
        if (!await this.fs.isDir(this.settings.projectPath)) return []
        this.pending = true

        const project = await this._checkIfFolderIsProjectFolder(this.settings.projectPath)
        if (project) {
          this.folder.add(project)
          return
        }

        
        await this._getFolderStructure(this.settings.projectPath, 0, this.folder)

        const leaves = this.folder.getFinalChildren()
        for (const leaf of leaves)
          this._removePathsWithoutProject(leaf)

        this.pending = false
      } catch (error) {
        this.pending = false
      }
    },

    async _checkIfFolderIsProjectFolder(path: string): Promise<IFolderStructure|null> {
      for (const fileName of this.settings.projectTypes) {
        const projectFile = await this.path.join(path, fileName)
        if(await this.fs.pathExists(projectFile)) {
          try {
            const file = await this.fs.readFile(projectFile, 'utf8');
            if (typeof fileName === 'string' && fileName.match(/json/)) {
              const { name, version } = JSON.parse(file as string)
              return {
                name,
                path,
                version,
                ifProject: true,
              }
            }
          } catch (_e) {}

        }
      }
      return null
    },

    async _getSubFolders(path: string): Promise<IFolderStructure[]> {
      const result = new Array<IFolderStructure>()

      for ( const name of await this.fs.readDir(path)) {
        console.log(name)
        if (typeof name === 'string' && !this.settings.ignorePaths.includes(name)) {
          try {
            const folderPath = await this.path.join(path, name)
            if (await this.fs.isDir(folderPath)) {
              result.push({
                name,
                path: folderPath,
                ifProject: false,
              })
            }
          } catch (_error) {}
        }
      }

      return result
    },

    async _getFolderStructure(path: string, level: number = 0, folder: TreeNode<IFolderStructure>) {
      if (level > this.settings.depth) return

      const subFolders = await this._getSubFolders(path)
      if (subFolders.length > 0) {
        const newLevel = level + 1
        for (const subFolder of subFolders) {
          const project = await this._checkIfFolderIsProjectFolder(subFolder.path)
          if (project) {
            folder.add(project)
          } else {
            await this._getFolderStructure(subFolder.path, newLevel, folder.add(subFolder))
          }
        }
      }

      return
    },

    _getNameFromPath(path: string) {
      return path.split(/[\\\/]/).pop() ?? ''
    },

    _removePathsWithoutProject(leaf: TreeNode<IFolderStructure>) {
      if (!leaf.data.ifProject && leaf.children.length === 0) {
        if (leaf.parent) this._removePathsWithoutProject(leaf.parent)
        leaf.remove()
      }
    },
  }
})