import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonListItem from '@/modules/pokemons/components/PokemonListItem.vue';

describe('PokemonListItem', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    weight: 69,
    height: 7,
    types: [
      { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } }
    ],
    image: 'https://example.com/bulbasaur.png',
    isFavorite: false
  };

  it('muestra el nombre del pokemon', () => {
    const wrapper = mount(PokemonListItem, {
      props: {
        pokemon: mockPokemon
      }
    });
    expect(wrapper.text()).toContain('bulbasaur');
  });

  it('emite el evento toggleFavorite con el ID correcto al hacer clic en el botón', async () => {
    const wrapper = mount(PokemonListItem, {
      props: {
        pokemon: mockPokemon
      }
    });

    const button = wrapper.findComponent({ name: 'BaseCircleButton' });
    await button.trigger('click');

    const toggleEvents = wrapper.emitted('toggleFavorite');
    expect(toggleEvents).toBeTruthy();
    if (toggleEvents) {
      expect(toggleEvents[0]).toEqual([1]);
    }
  });

  it('emite el evento click con el ID correcto al hacer clic en el componente', async () => {
    const wrapper = mount(PokemonListItem, {
      props: {
        pokemon: mockPokemon
      }
    });

    await wrapper.trigger('click');
    const toggleEvents = wrapper.emitted('click');
    expect(toggleEvents).toBeTruthy();
    if (toggleEvents) {
      expect(toggleEvents[0]).toEqual([1]);
    }
  });
});
