<script setup lang="ts">
import { ref } from 'vue';
import CustomInput from '@/components/elements/CustomInput.vue';

const path = ref('');
</script>

<template>
 <div class="wrapper">
  <CustomInput v-model="path" placeholder="Project path" />
 </div>
</template>

<style scoped lang="scss">
.wrapper {
  padding: 2rem 1rem;
}
</style>