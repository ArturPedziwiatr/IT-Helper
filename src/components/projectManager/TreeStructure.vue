<script setup lang="ts">
import FolderIndex from './FolderIndex.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { useFolderStructureStore } from '@/stores/FolderStructure.store';
import useTreeStructure from '@/composables/TreeStructure';

const dir = useFolderStructureStore().getFolder;
const { moveDown, moveUp, closeOrOpen, forceClose } = useTreeStructure();
const list = ref<HTMLElement|null>(null);

const onKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      moveDown()
      break;
    case 'ArrowUp':
      e.preventDefault()
      moveUp()
      break;
    case 'Enter':
      e.preventDefault()
      closeOrOpen()
      break;
    case 'ArrowRight':
      e.preventDefault()
      closeOrOpen({ state: true })
      break;
    case 'ArrowLeft':
      e.preventDefault()
      forceClose()
      break;
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  list.value?.focus()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div class="wrapper">
    <ul v-if="dir.children.length > 0" ref="list">
      <FolderIndex
        v-for="folder in dir.children"
        :key="folder.data.name"
        :folder="folder"
      />
    </ul>
  </div>
</template>