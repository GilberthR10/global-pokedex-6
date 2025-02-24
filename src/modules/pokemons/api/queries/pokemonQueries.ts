// src/modules/pokemons/api/queries/pokemonQueries.ts
import { useInfiniteQuery, useQuery } from "@tanstack/vue-query";
import type { Pokemon, PokemonListResult } from "../../interfaces";
import { getPokemonList, getPokemonByName } from "../services/pokemonService";

export const QUERY_KEYS = {
  pokemonList: ['pokemonList'] as const,
  pokemon: (name: string) => ['pokemon', name] as const,
};


//obtener la lista de Pokémon con scroll infinito
export const pokemonList = () => {
  return useInfiniteQuery<PokemonListResult, Error>({
    queryKey: QUERY_KEYS.pokemonList,
    queryFn: ({ pageParam = 0 }) => getPokemonList({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
};

//obtener un Pokémon por nombre
export const pokemonByName = (name: string) => {
  return useQuery<Pokemon, Error>({
    queryKey: QUERY_KEYS.pokemon(name),
    queryFn: () => getPokemonByName(name),
    enabled: !!name,
  });
};
