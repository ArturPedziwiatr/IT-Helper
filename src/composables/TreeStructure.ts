import { onMounted, onUnmounted, ref } from 'vue';
import { useFolderStructureStore } from '@/stores/FolderStructure.store';
import useExec from '@composable/Exec';
import { useAppSetingsStore } from '@store/AppSettings.store';
import { debounce } from 'lodash';
import { TreeNode } from '@Tree';
import { IFolderStructure } from '@interface/IFolderStructure';

const activePath = ref('');
const activeIndex = ref(0);
const activePaths = ref<string[]>([]);

interface IOptions {
  state?: boolean
  forceClose?: boolean
}

export default function useTreeStructure() {

  const { exec } = useExec();
  const settings = useAppSetingsStore().getProjectManager;

  const getActivePaths = () => {
    return Array.from(document.querySelectorAll('[path]')).map((el: any) => el.getAttribute('path'))
  }

  const observer = new MutationObserver(debounce((mutation: MutationRecord[]) => {
    if (mutation.some(m => m.type === 'childList')) {
      activePaths.value = getActivePaths()
    }
  }, 300));

  if (!activePath.value) activePath.value = activePaths.value[activeIndex.value];

  const moveUp = () => {
    activeIndex.value = activeIndex.value === 0 ? activePaths.value.length - 1 : activeIndex.value - 1;
    activePath.value = activePaths.value[activeIndex.value];
  }
  
  const moveDown = () => {
    console.log(activeIndex.value, activePaths.value.length)
    activeIndex.value = activeIndex.value + 1 ===  activePaths.value.length ? 0  : activeIndex.value + 1;
    activePath.value = activePaths.value[activeIndex.value];
  }

  const openFromLeaf = (leaf: TreeNode<IFolderStructure>) => {
    if (leaf.data.ifProject) {
      exec(`${settings.exec} ${leaf.data.path}`);
      return;
    }

    leaf.data.active = !leaf.data.active;
  }

  const closeOrOpen = (options?: IOptions) => {
    let leaf = useFolderStructureStore().getLeafByPath(activePath.value);
    if (!leaf) return;

    if (leaf.data.ifProject) {
      exec(`${settings.exec} ${leaf.data.path}`);
      return;
    }

    leaf.data.active = typeof options?.state === 'boolean' ? options.state : !leaf.data.active;
  }

  const forceClose = () => {
    let leaf = useFolderStructureStore().getLeafByPath(activePath.value);
    if (!leaf || !leaf.parent) return;

    if (leaf.data.active) {
      leaf.data.active = false;
      return;
    }

    if (!leaf.parent.parent) return;
    leaf.parent.data.active = false;

    activeIndex.value = activePaths.value.indexOf(leaf.parent.data.path)
    activePath.value = activePaths.value[activeIndex.value];
  }

  onMounted(() => {
    if ( activePaths.value.length === 0) activePaths.value = getActivePaths();
    observer.observe(document, { attributes: true, childList: true, subtree: true });
  });

  onUnmounted(() => {
    observer.disconnect();
  });

  return {
    moveUp,
    moveDown,
    forceClose,
    closeOrOpen,
    openFromLeaf,
    activePath,
  }
}