import { watch, computed, ref } from "vue";
import { pokemonList } from "../api";
import { storeToRefs } from 'pinia';
import { usePokemonStore } from "@/stores/pokemon";

import { usePokemonByName } from "../api/queries/pokemonQueries";

export const usePokemons = () => {
  const store = usePokemonStore();

  const {
    pokemonsList,
    favorites,
    favoritedPokemons,
  } = storeToRefs(store);

  const { isLoading: isLoadingList, data, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = pokemonList();

  // Actualizar store con pokemones obtenidos
  watch(data, () => {
    if (!data.value) return;
    store.setPokemons(data.value.pages.flatMap(page => page.pokemon));
  });

  // búsqueda
  const searchTerm = ref<string>("");

  const {
    data: searchResult,
    isLoading: isSearching,
    error: searchError,
    isError: queryIsError,
  } = usePokemonByName(searchTerm);

  const searchedPokemon = computed(() => {
    if (!searchResult.value) return null;

    const isFavorited = favorites.value.some(fav => fav.id === searchResult.value.id);
    return {
      ...searchResult.value,
      isFavorite: isFavorited
    };
  });

  const setSearchTerm = (term: string) => {
    searchTerm.value = term.trim().toLowerCase();
  };


  const allPokemons = computed(() => {
    return pokemonsList.value;
  });

  const displayedPokemons = computed(() => {
    if (searchTerm.value && searchedPokemon.value) {
      return [searchedPokemon.value];
    }
    return allPokemons.value;
  });

  const manualSearchError = ref(false);
  const isSearchError = computed(() => {
    if (!searchTerm.value) {
      return false;
    }
    return queryIsError.value || manualSearchError.value;
  });

  const resetSearch = () => {
    searchTerm.value = "";
    manualSearchError.value = false;
  };


  return {
    // Propiedades
    isLoadingList,
    isSearching,
    isError,
    error,
    searchError,
    isSearchError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    searchTerm,
    searchResult,

    // Acciones
    setSearchTerm,
    resetSearch,
    toggleFavorite: store.toggleFavorite,

    // Getters
    favorites,
    favoritedPokemons,
    allPokemons,
    displayedPokemons,
    searchedPokemon,
    hasSearchResults: computed(() => !!searchedPokemon.value),
    isSearchActive: computed(() => !!searchTerm.value),
  };
};
