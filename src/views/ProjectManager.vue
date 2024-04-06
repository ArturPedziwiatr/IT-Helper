<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { IpcMessage } from '@enum/IpcMessage';

const closeWindow = () => {
  window.ipcRenderer.send(IpcMessage.CLOSE_PROJECT_MANGER)
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'q') closeWindow();
};

onMounted(() => {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('blur', closeWindow);
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('blur', closeWindow);
})
</script>

<template>Dupa chuj 123</template>