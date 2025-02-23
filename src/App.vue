<script setup lang="ts">
import { ref, type Component } from 'vue';
import WelcomeView from './modules/pokemons/views/WelcomeView.vue';
import PokemonsListView from './modules/pokemons/views/PokemonsListView.vue';
import LoadingView from './modules/pokemons/views/LoadingView.vue';


const currentView: Component = ref({
  WelcomeView,
  PokemonsListView,
  LoadingView,
});

currentView.value = PokemonsListView;
</script>

<template>
  <div class="max-w-screen max-h-screen overflow-hidden">
    <component :is="currentView" />
  </div>
</template>

<style scoped></style>
