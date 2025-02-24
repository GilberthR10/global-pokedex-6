<script setup lang="ts">
import BaseModal from "@/components/BaseModal.vue";
import BaseCircleButton from "@/components/BaseCircleButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import type { Pokemon } from "../../interfaces/index.ts";

interface Props {
  isOpen: boolean;
  pokemon: Pokemon;
}

withDefaults(defineProps<Props>(), {
  isOpen: false,
});

const emit = defineEmits<{
  (e: "close"): void;
  (e: "toggleFavorite"): void;
  (e: "share"): void;
}>();

const handleShare = () => {
  emit("share");
};

const handleToggleFavorite = () => {
  emit("toggleFavorite");
};
</script>

<template>
  <BaseModal :is-open="isOpen" @close="emit('close')">
    <div class="flex flex-col gap-2 max-w-full">
      <!-- Pokemon Image -->
      <div
        class="relative bg-blue-100 rounded-t-lg overflow-hidden bg-[url(@/assets/pokemon-bg.png)] bg-center bg-cover"
      >
        <img
          :src="pokemon.image || undefined"
          :alt="pokemon.name"
          class="w-full h-48 object-contain block"
        />
      </div>

      <!-- Pokemon Details -->
      <div class="space-y-3 py-4 px-10">
        <div class="flex items-center border-b border-gray-300 gap-x-2">
          <span class="font-bold">Name: </span>
          <span class="text-gray-700 font-medium">{{ pokemon.name }}</span>
        </div>

        <div class="flex items-center border-b border-gray-300 gap-x-2">
          <span class="font-bold">Weight:</span>
          <span class="text-gray-700">{{ pokemon.weight }}</span>
        </div>

        <div class="flex items-center border-b border-gray-300 gap-x-2">
          <span class="font-bold">Height:</span>
          <span class="text-gray-700">{{ pokemon.height }}</span>
        </div>

        <div class="flex items-center border-b border-gray-300 gap-x-2">
          <span class="font-bold">Types:</span>
          <span class="text-gray-700">{{ pokemon.types.join(", ") }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center self-center gap-10 p-6 pt-0">
        <BaseButton :active="true" icon-position="left" @clicked="handleShare">
          Share to my friends
        </BaseButton>
        <BaseCircleButton :active="pokemon.isFavorite" @clicked="handleToggleFavorite" />
      </div>
    </div>
  </BaseModal>
</template>
