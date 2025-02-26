import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseCircleButton from '@/components/BaseCircleButton.vue';

describe('BaseCircleButton', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(BaseCircleButton);
    expect(wrapper.exists()).toBe(true);
  });

  it('aplica la clase active cuando está activo', () => {
    const wrapper = mount(BaseCircleButton, {
      props: {
        active: true
      }
    });
    expect(wrapper.find('svg').classes()).toContain('text-amber-400');
  });

  it('emite el evento clicked al hacer clic', async () => {
    const wrapper = mount(BaseCircleButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('clicked')).toBeTruthy();
  });
});
