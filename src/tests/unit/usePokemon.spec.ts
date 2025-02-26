import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePokemons } from '@/modules/pokemons/composables/usePokemon';
import { setActivePinia, createPinia } from 'pinia';

// Mock de TanStack Query
vi.mock('@tanstack/vue-query', () => ({
  useInfiniteQuery: vi.fn(() => ({
    data: { value: { pages: [{ pokemon: [] }] } },
    isLoading: { value: false },
    isError: { value: false },
    error: { value: null },
    fetchNextPage: vi.fn(),
    hasNextPage: { value: false },
    isFetchingNextPage: { value: false }
  })),
  useQuery: vi.fn(() => ({
    data: { value: null },
    isLoading: { value: false },
    error: { value: null },
    isError: { value: false }
  }))
}));

describe('usePokemons', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('debe inicializar con valores predeterminados', () => {
    const pokemons = usePokemons();
    expect(pokemons.searchTerm.value).toBe('');
    expect(pokemons.allPokemons.value).toEqual([]);
  });

  it('debe actualizar el término de búsqueda', () => {
    const pokemons = usePokemons();
    pokemons.setSearchTerm('pikachu');
    expect(pokemons.searchTerm.value).toBe('pikachu');
  });

  it('debe reiniciar el término de búsqueda', () => {
    const pokemons = usePokemons();
    pokemons.setSearchTerm('pikachu');
    pokemons.resetSearch();
    expect(pokemons.searchTerm.value).toBe('');
  });
});
