<script setup lang='ts'>
import useSettingsDrawer from '@/composables/SettingsDrawer';
import { SettingsDrawer } from '@/enums/SettingsDrawer';

const { activeDrawer, setActiveDrawer } = useSettingsDrawer();
const menu = [
  { name: 'Main settings', drawer: SettingsDrawer.MAIN },
  { name: 'Project manager', drawer: SettingsDrawer.PROJECT_MANAGER },
];
</script>

<template>
  <ul>
    <li
      v-for="item in menu"
      :key="item.name"
      :class="{ active: activeDrawer === item.drawer }"
      @click="setActiveDrawer(item.drawer)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import '@/assets/scss/_variables';
@import '@/assets/scss/_animations';

ul {
  list-style-type: none;
  padding: 1.5rem 0;
  margin: 0;
  width: 200px;
  height: 100%;
  overflow: auto;

  li {
    padding: 1rem;
    text-decoration: none;
    font-weight: 400;
    font-size: $primary-font-size;
    color: $color-text;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    position: relative;
    cursor: pointer;

    &.active,
    &:hover {
      color: $color-primary;
    }

    &:hover:not(.active) {
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        background: $color-primary;
        height: 2px;
        width: 100%;
        animation: nav-underline 500ms;
        animation-timing-function: ease;
        animation-iteration-count: 1;
      }
    }
  }
}
</style>