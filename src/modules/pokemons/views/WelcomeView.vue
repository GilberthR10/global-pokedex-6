<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import IconPicachu from "@/components/icons/IconPicachu.vue";
import { usePokemons } from "../composables/usePokemon";
import { useApp, ViewType } from "../composables/useApp";

const { setCurrentView } = useApp();

const { fetchNextPage } = usePokemons();

const handleGetStarted = () => {
  setTimeout(() => {
    setCurrentView(ViewType.POKEMONS_LIST);
  }, 2000);
  setCurrentView(ViewType.LOADING);
  fetchNextPage();
};
</script>

<template>
  <section class="min-h-screen min-w-screen flex items-center justify-center">
    <div class="text-center max-w-lg p-6 space-y-10">
      <div class="mb-8 flex items-center justify-center">
        <IconPicachu class="animate-pulse h-96 w-96" />
      </div>
      <h1 class="text-2xl font-bold">Welcome to Pokédex</h1>
      <p class="text-gray-600">
        The digital encyclopedia created by Professor Oak is an invaluable tool to
        Trainers in the Pokémon world.
      </p>

      <BaseButton active @clicked="handleGetStarted"> Get started </BaseButton>
    </div>
  </section>
</template>

<style scoped></style>
