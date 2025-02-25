import { watch, computed, ref } from "vue";
import { pokemonList } from "../api";
import { storeToRefs } from 'pinia'
import { usePokemonStore } from "@/stores/pokemon";
import type { Pokemon } from "../interfaces";



export const usePokemons = () => {
  const pokemonsFinded = ref<Pokemon[]>([]);

  const store = usePokemonStore()

  const {
    pokemonsList,
    favorites,
    favoritedPokemons,
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



  return {
    // Properties
    isLoadingList,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    pokemonsFinded,


    favorites,
    favoritedPokemons,
    //actions
    toggleFavorite: store.toggleFavorite,

    //GetPokemonByName
    // Computed
    allPokemons
  }
}
