<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { useApp } from "./modules/pokemons/composables/useApp";

const { currentComponent } = useApp();
</script>

<template>
  <div class="max-w-screen max-h-screen overflow-hidden">
    <component :is="currentComponent" />
  </div>
  <VueQueryDevtools />
</template>

<style scoped></style>
