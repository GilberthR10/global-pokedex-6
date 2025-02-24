<script setup lang="ts">
import IconClose from "./icons/IconClose.vue";

interface Props {
  isOpen: boolean;
  testid?: string;
}

withDefaults(defineProps<Props>(), {
  testid: "base-modal",
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <div v-if="isOpen" :data-testid="testid">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black/50 transition-opacity" @click="handleClose" />

    <!-- Modal -->
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-[315px] relative">
        <!-- Close button -->
        <button
          @click="handleClose"
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10"
        >
          <IconClose />
        </button>

        <!-- Modal content -->
        <div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
