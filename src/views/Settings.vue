<script setup lang="ts">
import useShortcutManager from '@composable/ShotcutManager'

const {
  setShortcutForProjectManager,
} = useShortcutManager();

setShortcutForProjectManager('Ctrl+E')
</script>

<template>
  <p>asdasdasdasda</p>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
</style>