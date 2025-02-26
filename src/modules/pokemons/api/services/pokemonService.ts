
import apiClient from "../axiosInstance";
import type { Pokemon, PokemonListItem, PokemonListResponse, PokemonListResult } from "../../interfaces/index";


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

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  try {
    const { data } = await apiClient.get<PokemonListItem>(`/pokemon/${name.toLowerCase()}`);
    return {
      id: data.id,
      name: data.name,
      weight: data.weight,
      height: data.height,
      types: data.types,
      image: data.sprites?.other?.dream_world?.front_default
        || data.sprites?.other?.['official-artwork']?.front_default
        || data.sprites?.front_default
        || null,
      isFavorite: false,
    };
  } catch (error) {
    throw error;
  }
};



