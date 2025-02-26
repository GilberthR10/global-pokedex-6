import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ToastMessage from '@/modules/pokemons/components/ToastMessage.vue';

describe('ToastMessage', () => {
  it('no muestra el toast cuando showToast es false', () => {
    const wrapper = mount(ToastMessage, {
      props: {
        showToast: false,
        text: 'Test message'
      }
    });
    // En lugar de isVisible, verificamos si el elemento existe
    expect(wrapper.find('[data-testid="toast-message"]').exists()).toBe(false);
  });

  it('muestra el toast con el texto correcto cuando showToast es true', () => {
    const wrapper = mount(ToastMessage, {
      props: {
        showToast: true,
        text: 'Test message'
      }
    });
    expect(wrapper.find('[data-testid="toast-message"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Test message');
  });
});
