<script setup lang="ts">
import { AppMode } from '@/enums/AppMode';
import useThemeColor from '@/composables/ThemeColor';
import { useAppSetingsStore } from '@/stores/AppSettings.store';
import CloseButton from '@/components/elements/CloseButton.vue';
import SettingsDrawers from '@/components/settings/SettingsDrawers.vue';
import useSettingsDrawer from '@/composables/SettingsDrawer';


const { changeMode } = useThemeColor();
changeMode(AppMode.DARK);
const { getView } = useSettingsDrawer();
const appSettingsStore = useAppSetingsStore().getMain;
</script>

<template>
  <div class="wrapper">
    <SettingsDrawers />
    <hr :color="appSettingsStore.color">
    <CloseButton class="wrapper--btn-close"/>
    <component :is="getView" />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;

  hr {
    height: 95%;
    width: 4px;
    border-radius: 50%;
    margin: auto 0;
  }

  &--btn-close {
    height: fit-content;
    width: fit-content;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>