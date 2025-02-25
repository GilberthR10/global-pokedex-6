<script setup lang="ts">
import { ref } from "vue";
import PokemonSearch from "../components/PokemonSearch.vue";
import PokemonsList from "../components/PokemonsList.vue";
import TheFooter from "../components/TheFooter.vue";

import { usePokemons } from "../composables/usePokemon";

const searchTerm = ref("");
const showFavorites = ref(false);

const { allPokemons } = usePokemons();

const handleSearch = (term: string) => {
  console.log(term);
};
const handleChangeView = () => {
  showFavorites.value = !showFavorites.value;
};
</script>

<template>
  <div class="relative flex flex-col h-screen p-8 md:p-0 md:max-w-7/12 mx-auto">
    <PokemonSearch @search="handleSearch" class="my-10" />
    <PokemonsList
      :searchTerm="searchTerm"
      :all-pokemons="allPokemons"
      :showOnlyFavorites="showFavorites"
    />
  </div>

  <div class="fixed bottom-0 left-0 right-0 bg-white shadow-md">
    <TheFooter @changeView="handleChangeView" />
  </div>
</template>
