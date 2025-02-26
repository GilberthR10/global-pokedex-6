import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonSearch from '@/modules/pokemons/components/PokemonSearch.vue';

describe('PokemonSearch', () => {
  it('actualiza el modelo al escribir en el input', async () => {
    const wrapper = mount(PokemonSearch, {
      props: {
        modelValue: ''
      }
    });
    const input = wrapper.find('input');
    await input.setValue('pikachu');

    const updateEvents = wrapper.emitted('update:modelValue');
    expect(updateEvents).toBeTruthy();

    if (updateEvents) {
      expect(updateEvents[0]).toEqual(['pikachu']);
    }

  });
});
