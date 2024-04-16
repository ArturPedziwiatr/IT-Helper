import { IFolderStructure } from '@/interfaces/IFolderStructure'

export class Folder {
  name: string
  path: string
  version?: string
  ifProject: boolean
  active: boolean
  children: Folder[];
  parent: Folder | null;

  constructor() {
    this.name
  }

  public add(data: Folder|IFolderStructure): Folder {
    let element;

    if (data instanceof Folder) {
      element = data;
    } else {
      element = new Folder();
      element.name = data.name;
      element.path = data.path;
      element.version = data.version;
      element.ifProject = data?.ifProject ?? false;
      element.active = data?.active ?? false;
    }

    if (this.parent === null) {
      this.parent = element;
      return this.parent;
    }
    this.children.push(element);
    return element;
  }

  public remove() {
    if (this.parent !== null) {
      const index = this.parent.children.indexOf(this);
      if (index !== -1) 
        this.parent.children.splice(index, 1);
    }

    for (const child of this.children) {
      child.remove();
    }
  }

  public getFinalChildren(): TreeNode<T>[] {
    const leaves: TreeNode<T>[] = [];

    const traverse = (node: TreeNode<T>) => {
        if (node.children.length === 0) {
            leaves.push(node);
        } else {
            node.children.forEach(child => traverse(child));
        }
    };

    traverse(this);
    return leaves;
  }

  public findRoot(): TreeNode<T> {
    if (this.parent === null) return this;
    return this.parent.findRoot();
  }
}
