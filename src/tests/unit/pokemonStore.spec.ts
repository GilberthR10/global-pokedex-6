import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePokemonStore } from '@/stores/pokemon'; // Ajusta la ruta según tu estructura
import type { Pokemon } from '@/modules/pokemons/interfaces';

describe('Pokemon Store', () => {
  let store: ReturnType<typeof usePokemonStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = usePokemonStore();
  });

  it('debe iniciar con una lista vacía de pokemons', () => {
    expect(store.pokemonsList).toEqual([]);
  });

  it('debe establecer una nueva lista de pokemons', () => {
    const mockPokemons: Pokemon[] = [
      {
        id: 1, name: 'Bulbasaur', weight: 69, height: 7,
        types: [
          { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
          { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } }
        ],
        image: 'https://img.pokemon.com/bulbasaur.png',
        isFavorite: false
      },
      {
        id: 2, name: 'Charmander', weight: 85, height: 6,
        types: [
          { slot: 1, type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' } }
        ],
        image: 'https://img.pokemon.com/charmander.png',
        isFavorite: false
      }
    ];

    store.setPokemons(mockPokemons);
    expect(store.pokemonsList).toHaveLength(2);
    expect(store.pokemonsList[0].name).toBe('Bulbasaur');
    expect(store.pokemonsList[1].types[0].type.name).toBe('fire');
  });

  it('debe agregar y eliminar un pokemon de favoritos', () => {
    const pokemon: Pokemon = {
      id: 1, name: 'Bulbasaur', weight: 69, height: 7,
      types: [
        { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
        { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } }
      ],
      image: 'https://img.pokemon.com/bulbasaur.png'
    };

    // Agregar a favoritos
    store.toggleFavorite(pokemon);
    expect(store.favorites).toContainEqual({ ...pokemon, isFavorite: undefined });

    // Eliminar de favoritos
    store.toggleFavorite(pokemon);
    expect(store.favorites).not.toContainEqual(pokemon);
  });

  it('debe marcar correctamente los favoritos en la lista de pokemons', () => {
    const mockPokemons: Pokemon[] = [
      {
        id: 1, name: 'Bulbasaur', weight: 69, height: 7,
        types: [
          { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
          { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } }
        ],
        image: 'https://img.pokemon.com/bulbasaur.png',
      },
      {
        id: 2, name: 'Charmander', weight: 85, height: 6,
        types: [
          { slot: 1, type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' } }
        ],
        image: 'https://img.pokemon.com/charmander.png',
      }
    ];

    store.setPokemons(mockPokemons);
    store.toggleFavorite(mockPokemons[0]); // Marcar Bulbasaur como favorito

    expect(store.pokemonsList[0].isFavorite).toBe(true);
    expect(store.pokemonsList[1].isFavorite).toBe(false);
  });
});
