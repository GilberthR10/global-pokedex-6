// src/modules/pokemons/views/PokemonsListView.vue
<script setup lang="ts">
import { ref } from "vue";
import PokemonSearch from "../components/PokemonSearch.vue";
import PokemonsList from "../components/PokemonsList.vue";
import TheFooter from "../components/TheFooter.vue";

// Reactive reference for search term
const searchTerm = ref("");
const showFavorites = ref(false);

// Handler for search updates
const handleSearch = (term: string) => {
  searchTerm.value = term;
};
const handleChangeView = () => {
  showFavorites.value = !showFavorites.value;
};
</script>

<template>
  <div class="relative flex flex-col h-screen p-8 md:p-0 md:max-w-7/12 mx-auto">
    <PokemonSearch @search="handleSearch" class="z-10 my-10" />
    <div class="flex-1 overflow-hidden mb-20">
      <div class="h-full overflow-y-auto" id="scroll-container">
        <PokemonsList :searchTerm="searchTerm" :showOnlyFavorites="showFavorites" />
      </div>
    </div>
  </div>

  <div class="fixed bottom-0 left-0 right-0 bg-white shadow-md">
    <TheFooter @changeView="handleChangeView" />
  </div>
</template>
