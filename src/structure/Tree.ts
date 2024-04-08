export class TreeNode<T> {
  data: T;
  children: TreeNode<T>[];
  parent: TreeNode<T> | null;

  constructor(data: T) {
      this.data = data;
      this.children = [];
      this.parent = null;
  }

  add(data: T) {
      const child = new TreeNode(data);
      child.parent = this;
      this.children.push(child);
      return child;
  }

  remove() {
    if (this.parent !== null) {
      const index = this.parent.children.indexOf(this);
      if (index !== -1) 
        this.parent.children.splice(index, 1);
    }

    for (const child of this.children) {
      child.remove();
    }
  }

  getFinalChildren(): TreeNode<T>[] {
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
}
