<script setup lang="ts">
import { PropType } from 'vue';
import { TreeNode } from '@/structure/Tree';
import { IFolderStructure } from '@/interfaces/IFolderStructure';
import useTreeStructure from '@/composables/TreeStructure';

const { activePath, openFromLeaf } = useTreeStructure();
defineProps({
  folder: {
    type: Object as PropType<TreeNode<IFolderStructure>>,
    required: true
  }
})

</script>

<template>
  <li
    :class="{ active: folder.data.path === activePath }"
    :path="folder.data.path"
  >
    <span @click="openFromLeaf(folder)">
      {{ folder.data.name }}
    </span>
    <ul v-if="folder.children.length > 0 && folder.data.active">
      <FolderIndex
        v-for="child in folder.children"
        :key="child.data.name"
        :folder="child"
      />
    </ul>
  </li>
</template>

<style scoped lang="scss">
.active {
  > span {
    background-color: rgba(201, 30, 30, 0.1);
    border-radius: 0.4vw;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    cursor: pointer;
  }
}
</style>