<template>
  <div class="">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-5"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-5"
    >
      <div
        v-show="showToast"
        class="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      >
        ✅ {{ text }}
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
interface Props {
  showToast: boolean;
  text: string;
  testid?: string;
}

withDefaults(defineProps<Props>(), {
  showToast: false,
  text: "",
});
</script>
