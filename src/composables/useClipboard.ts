import { ref } from "vue";

export function useClipboard() {
  const copied = ref<boolean>(false);

  const copyText = async (text: string): Promise<void> => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      copied.value = true;

      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return { copied, copyText };
}
