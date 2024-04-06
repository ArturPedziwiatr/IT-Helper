import { ref } from 'vue'
import useFileSystem  from './FileSystem'
import useAppSettings from './AppSettings'
import usePath from './Path'

export default function useFolderStructure() {
  const { readDir, pathExists, isDir } = useFileSystem()
  const { appSettings } = useAppSettings()
  const { join } = usePath()
  const pending = ref(false)

  const generateFoldersStructure = async (path: string, deepth: number = 2) => {
    const folders = ref<string[]>([])
    pending.value = true

    const getProjectPath = async (path: string, level: number) => {
      if (level > deepth) return
      for (const fileName of appSettings.value.projectTypes) {
        const projectFile = await join(path, fileName)
        if(await pathExists(projectFile)) {
          folders.value.push(projectFile)
          return
        }
      } 

      if (await isDir(path)) {
        try {
          const childFolders = await readDir(path)
          const newLevel = level + 1
          for (const folder of childFolders) {
            if (typeof folder === 'string')
              await getProjectPath(await join(path, folder), newLevel)
          }
        } catch (error) {
          console.error(error)
        }
      }
    }

    await getProjectPath(path, 0)

    return folders.value
  }

  return {
    generateFoldersStructure,
  }
}