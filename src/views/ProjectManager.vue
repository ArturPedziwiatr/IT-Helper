<script setup lang="ts">
import { Routes } from '@enum/Routes';
import { IpcMessage } from '@enum/IpcMessage';
import { onMounted, onBeforeUnmount } from 'vue';
import TreeStructure from '@/components/projectManager/TreeStructure.vue';

const closeWindow = () => {
  window.ipcRenderer.send(IpcMessage.CLOSE_DIALOG, Routes.PROJECT_MANAGER)
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'q') closeWindow();
};

onMounted(() => {
  window.addEventListener('keydown', onKeyDown);
  // window.addEventListener('blur', closeWindow);
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown);
  // window.removeEventListener('blur', closeWindow);
})

</script>

<template>
  <div>
    <TreeStructure />
  </div>
</template>