// src/composables/useClipboard.ts
import { ref } from 'vue';

export const useClipboard = () => {
  const copied = ref(false);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      copied.value = true;

      // ocultar después de un tiempo
      setTimeout(() => {
        copied.value = false;
      }, 3000);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  };

  return {
    copied,
    copyText
  };
};
