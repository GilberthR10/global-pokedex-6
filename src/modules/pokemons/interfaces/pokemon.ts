import type { Type } from "./pokemonItem-response";

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: Type[];
  image: string | null;
  isFavorite?: boolean;
}

export interface PokemonListResult {
  pokemon: Pokemon[];
  nextOffset: number | null;
}
