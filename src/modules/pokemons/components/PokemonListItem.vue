<script setup lang="ts">
import BaseCircleButton from "@/components/BaseCircleButton.vue";

interface Pokemon {
  id: number;
  name: string;
  isFavorite?: boolean;
}

interface Props {
  pokemon: Pokemon;
  isSelected?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "toggleFavorite", id: number): void;
  (e: "click", id: number): void;
}>();

const handleFavoriteClick = (): void => {
  emit("toggleFavorite", props.pokemon.id);
};

const handleClick = () => {
  emit("click", props.pokemon.id);
};
</script>

<template>
  <div
    class="p-5 flex items-center justify-between font-bold shadow-2xs bg-white rounded-lg cursor-pointer"
    @click.stop="handleClick"
  >
    <!-- Pokemon Name -->
    <span>{{ pokemon.name }}</span>

    <!-- Favorite Button -->
    <BaseCircleButton
      :active="pokemon.isFavorite"
      @clicked="handleFavoriteClick"
      addCss="hover:bg-gray-100"
    />
  </div>
</template>
