import { IFolderStructure } from '@/interfaces/IFolderStructure';
import { TreeNode } from '@/structure/Tree';

const getProjects = (tree: TreeNode<IFolderStructure>) => 
  tree.children.filter(child => child.data.ifProject)

const getFolders = (tree: TreeNode<IFolderStructure>) =>
  tree.children.filter(child => !child.data.ifProject)

export {
  getProjects,
  getFolders
}