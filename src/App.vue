<template>
  <div id="app-container">
    <RouterView /> <!-- renderiza o componente na tela de acordo com a url atual -->
    <ToastContainer /> <!--toast, mensagem de exibição na tela-->
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import ToastContainer from '@/components/ToastContainer.vue';
</script>