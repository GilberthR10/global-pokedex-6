import { useInfiniteQuery, useQuery } from "@tanstack/vue-query";
import type { PokemonListResult } from "../../interfaces";
import { getPokemonList, getPokemonByName } from "../services/pokemonService";
import { type Ref, computed } from "vue";

export const QUERY_KEYS = {
  pokemonList: ['pokemonList'] as const,
  pokemon: (name: string) => ['pokemon', name] as const,
};

export const pokemonList = () => {
  return useInfiniteQuery<PokemonListResult, Error>({
    queryKey: QUERY_KEYS.pokemonList,
    queryFn: ({ pageParam = 0 }) => getPokemonList({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
};


export const usePokemonByName = (nameRef: Ref<string>) => {
  return useQuery({
    queryKey: computed(() => QUERY_KEYS.pokemon(nameRef.value)),
    queryFn: () => getPokemonByName(nameRef.value),
    enabled: computed(() => !!nameRef.value),
    retry: false,
  });
};
