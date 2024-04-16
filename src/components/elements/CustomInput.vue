<script setup lang="ts">
import { PropType, defineProps } from 'vue';
import { InputMode } from '@/enums/InputMode';


defineProps({
  mode: {
    type: String as PropType<InputMode>,
    default: InputMode.NONE
  }
})
</script>

<template>
  <div class="wrapper">
    <input/>
    <button v-if="mode === InputMode.DIR">
      <OhVueIcon name="FaFolderOpen" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

input {
  font-weight: 500;
  font-size: 12px;
  color: $color-text;
  background-color: rgb(28,28,30);
  box-shadow: 0 0 .4vw rgba(0,0,0,0.5), 0 0 0 .15vw transparent;
  border-radius: 0.4vw;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  transition: .4s;
  height: fit-content;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: 0 0 0 .15vw rgba(135, 207, 235, 0.186);
  }
  
  &:focus {
    box-shadow: 0 0 0 .15vw $color-primary;
  }
}

</style>