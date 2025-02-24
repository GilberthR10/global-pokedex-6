
import apiClient from "../axiosInstance";
import type { Pokemon, PokemonListItem, PokemonListResponse, PokemonListResult } from "../../interfaces/index";


// Obtener lista de Pokémon con detalles incluidos
export const getPokemonList = async ({ pageParam }: { pageParam: unknown }): Promise<PokemonListResult> => {
  const limit = 20;
  const offset = typeof pageParam === "number" ? pageParam : 0;

  // obtener la lista de nombres y URLs
  const response = await apiClient.get<PokemonListResponse>(`/pokemon?offset=${offset}&limit=${limit}`);

  // Segunda petición para obtener los detalles de cada Pokémon
  const pokemonList = await Promise.all(
    response.data.results.map(async ({ name }) => {
      const pokemonResponse = await apiClient.get<PokemonListItem>(`/pokemon/${name}`);
      const pokemonData = pokemonResponse.data;

      return {
        id: pokemonData.id,
        name: pokemonData.name,
        weight: pokemonData.weight,
        height: pokemonData.height,
        types: pokemonData.types,
        image: pokemonData?.sprites?.other?.dream_world?.front_default || pokemonData.sprites?.front_default || null,
        isFavorite: false,
      };
    })
  );

  return {
    pokemon: pokemonList,
    nextOffset: response.data.next ? offset + limit : null,
  };
};

// Obtener detalles de un Pokémon por nombre
export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  const response = await apiClient.get<Pokemon>(`/pokemon/${name}`);
  return response.data;
};



