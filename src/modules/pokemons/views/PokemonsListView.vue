<script setup lang="ts">
import { ref, watch } from "vue";
import PokemonSearch from "../components/PokemonSearch.vue";
import PokemonsList from "../components/PokemonsList.vue";
import TheFooter from "../components/TheFooter.vue";
import { usePokemons } from "../composables/usePokemon";
import BaseButton from "@/components/BaseButton.vue";
import { useDebounceFn } from "@vueuse/core";
import IconLoader from "@/components/icons/IconLoader.vue";
import PokemonSingleItem from "../components/PokemonSingleItem.vue";

const showFavorites = ref(false);

const {
  setSearchTerm,
  resetSearch,
  isSearching,
  isSearchError,
  searchedPokemon,
  allPokemons,
} = usePokemons();

const handleChangeView = (view: string) => {
  showFavorites.value = view === "favorites";
  resetLocalSearch();
};

const debouncedSearch = useDebounceFn((term: string) => {
  if (term && term.trim() !== "" && search.value.trim() !== "") {
    setSearchTerm(term);
  }
}, 100);

const search = ref("");
const resetLocalSearch = () => {
  search.value = "";
  resetSearch();
};

watch(search, (newValue) => {
  if (newValue.trim() !== "") {
    debouncedSearch(newValue.trim());
  } else {
    resetLocalSearch();
  }
});
</script>

<template>
  <div class="relative flex flex-col h-screen p-8 md:p-0 md:max-w-7/12 mx-auto">
    <PokemonSearch class="my-10" v-model="search" />
    <div v-if="isSearching" class="flex justify-center items-center py-2">
      <IconLoader class="w-10 h-10 animate-spin" />
    </div>
    <div v-if="isSearchError && search.trim() !== ''" class="mb-4">
      <div v-if="isSearchError" class="text-center py-2 flex-col space-y-5">
        <div class="text-4xl">Uh-oh!</div>
        <p class="text-gray-600">You look lost on your journey!</p>
        <BaseButton :active="true" icon-position="left" @clicked="resetLocalSearch">
          <template #default>Go back home</template>
        </BaseButton>
      </div>
    </div>
    <div v-if="searchedPokemon && search" class="">
      <PokemonSingleItem v-if="searchedPokemon" :search-result="searchedPokemon" />
    </div>
    <PokemonsList
      v-if="!searchedPokemon && !search && !isSearchError"
      :all-pokemons="allPokemons"
      :showOnlyFavorites="showFavorites"
    />
  </div>

  <div class="fixed bottom-0 left-0 right-0 bg-white shadow-md">
    <TheFooter @changeView="handleChangeView" />
  </div>
</template>
