import { watch, computed } from "vue";
import { pokemonList, pokemonByName } from "../api";
import { storeToRefs } from 'pinia'
import { usePokemonStore } from "@/stores/pokemon";


export const usePokemons = () => {
  const store = usePokemonStore()
  const {
    pokemonsList,
    favorites,
    favoritedPokemons
  } = storeToRefs(store)

  const { isLoading: isLoadingList, data, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = pokemonList();

  watch(data, () => {
    if (!data.value) return [];
    store.setPokemons(data.value.pages.flatMap(page => page.pokemon))
  })
  const allPokemons = computed(() => {
    if (!data.value) return [];
    return pokemonsList.value
  });


  const searchPokemon = async (term: string) => {
    if (!term) return;
    const { data, isLoading } = pokemonByName(term);
    return { data, isLoading }
  };


  return {
    // Properties
    isLoadingList,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,


    favorites,
    favoritedPokemons,
    //actions
    toggleFavorite: store.toggleFavorite,


    //GetPokemonByName
    searchPokemon,
    // Computed
    allPokemons
  }
}
