<script setup lang="ts">
import { ref } from "vue";
import ToastMessage from "./ToastMessage.vue";

import PokemonListItem from "./PokemonListItem.vue";
import PokemonDetail from "./modals/PokemonDetail.vue";

import type { Pokemon } from "../interfaces/index.ts";
import { usePokemons } from "../composables/usePokemon";
import { useClipboard } from "@/composables/useClipboard";

const { toggleFavorite } = usePokemons();
interface Props {
  searchResult: Pokemon;
}

defineProps<Props>();

const handleToggleFavorite = (pokemon: Pokemon) => {
  console.log("hola");
  if (selectedPokemon.value) {
    selectedPokemon.value.isFavorite = !selectedPokemon.value.isFavorite;
  }
  toggleFavorite(pokemon);
};

//Modal component
const isModalOpen = ref(false);
const selectedPokemon = ref<Pokemon>();

const handlePokemonClick = (pokemon: Pokemon) => {
  selectedPokemon.value = pokemon;
  isModalOpen.value = true;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
  selectedPokemon.value = undefined;
};

const { copied, copyText } = useClipboard();

const handleShare = () => {
  if (selectedPokemon.value) {
    const { name, weight, height, types } = selectedPokemon.value;
    const typesText = types.map((t) => t.type.name).join(", ");
    const text = `Name: ${name}, Weight: ${weight}, Height: ${height}, Types: ${typesText}`;

    copyText(text);
    isModalOpen.value = false;
    selectedPokemon.value = undefined;
  }
};
</script>

<template>
  <ToastMessage :text="'texto copiado'" :show-toast="copied" />
  <PokemonListItem
    v-if="searchResult"
    :pokemon="searchResult"
    @click="handlePokemonClick(searchResult)"
    @toggleFavorite="handleToggleFavorite(searchResult)"
  />

  <!-- Modal de Detalles -->
  <Teleport to="body">
    <PokemonDetail
      v-if="selectedPokemon"
      :is-open="isModalOpen"
      :pokemon="selectedPokemon"
      @close="handleCloseModal"
      @toggleFavorite="handleToggleFavorite(selectedPokemon)"
      @share="handleShare"
      class="fixed inset-0 flex items-center justify-center z-50"
    />
  </Teleport>
</template>
