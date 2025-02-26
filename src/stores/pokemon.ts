import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Pokemon } from '../modules/pokemons/interfaces';
import { useLocalStorage } from '@vueuse/core';

export const usePokemonStore = defineStore('pokemon', () => {
  // State
  const pokemonsList = ref<Pokemon[]>([]);
  const searchTerm = ref<string>('');
  const favorites = useLocalStorage<Pokemon[]>('pokemon-favorites', []);

  // Getters
  const favoritedPokemons = computed(() => favorites.value);


  const updatedPokemonsList = computed(() => {
    const favoriteSet = new Set(favorites.value.map((fav) => fav.id));
    return pokemonsList.value.map((pokemon) => ({
      ...pokemon,
      isFavorite: favoriteSet.has(pokemon.id),
    }));
  });
  // Actions
  const setPokemons = (newPokemons: Pokemon[]) => {
    pokemonsList.value = [...newPokemons];
  };

  const toggleFavorite = (pokemon: Pokemon) => {
    const isFavorited = favorites.value.some(fav => fav.id === pokemon.id);

    if (isFavorited) {
      favorites.value = favorites.value.filter(fav => fav.id !== pokemon.id);
    } else {
      const pokemonWithFavorite = {
        ...pokemon,
        isFavorite: true
      };

      favorites.value = [...favorites.value, pokemonWithFavorite];
    }

    // Actualiza lista principal
    const index = pokemonsList.value.findIndex(p => p.id === pokemon.id);
    if (index !== -1) {
      pokemonsList.value[index] = {
        ...pokemonsList.value[index],
        isFavorite: !isFavorited
      };
    }
  };

  return {
    // State
    pokemonsList: updatedPokemonsList,
    favorites,
    searchTerm,
    // Getters
    favoritedPokemons,
    // Actions
    setPokemons,
    toggleFavorite,
  };
});
