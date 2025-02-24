import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Pokemon } from '../modules/pokemons/interfaces';

export const usePokemonStore = defineStore(
  'pokemon',
  () => {
    // State
    const pokemonsList = ref<Pokemon[]>([]);
    const favorites = ref<Pokemon[]>([]);

    // Getters
    const favoritedPokemons = computed(() => favorites.value);

    // Actions
    const setPokemons = (newPokemons: Pokemon[]) => {
      pokemonsList.value = [...pokemonsList.value, ...newPokemons];
    };

    const toggleFavorite = (pokemon: Pokemon) => {
      const index = favorites.value.findIndex((fav) => fav.id === pokemon.id);
      if (index !== -1) {
        favorites.value.splice(index, 1); // Eliminar de favoritos
      } else {
        favorites.value.push(pokemon); // Agregar a favoritos
      }
      updatePokemonFavorites();
    };

    const updatePokemonFavorites = () => {
      pokemonsList.value = pokemonsList.value.map((pokemon) => ({
        ...pokemon,
        isFavorite: favorites.value.some((fav) => fav.id === pokemon.id),
      }));
    };

    return {
      // State
      pokemonsList,
      favorites,
      // Getters
      favoritedPokemons,
      // Actions
      setPokemons,
      toggleFavorite,
    };
  }
);
