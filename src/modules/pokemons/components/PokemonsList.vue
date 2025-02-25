<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from "vue";
import { useClipboard } from "@/composables/useClipboard";

import ToastMessage from "./ToastMessage.vue";
import type { Pokemon } from "../interfaces/index.ts";
import { usePokemons } from "../composables/usePokemon";
import { useInfiniteScroll, useVirtualList } from "@vueuse/core";
import PokemonListItem from "./PokemonListItem.vue";

interface Props {
  searchTerm?: string;
  showOnlyFavorites?: boolean;
  allPokemons: Pokemon[];
}

const props = defineProps<Props>();

const { toggleFavorite, favoritedPokemons } = usePokemons();

const filteredPokemons = computed(() => {
  return props.allPokemons;
});

const handleToggleFavorite = (pokemon: Pokemon) => {
  if (selectedPokemon.value) {
    selectedPokemon.value.isFavorite = !selectedPokemon.value.isFavorite;
  }
  toggleFavorite(pokemon);
};
//Modal component
const PokemonDetail = defineAsyncComponent(() => import("./modals/PokemonDetail.vue"));
// Estado del modal
const isModalOpen = ref(false);
const selectedPokemon = ref<Pokemon>();

// Handlers modal
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
    const text = `${selectedPokemon.value.name} Types: ${selectedPokemon.value.types.join(
      ", "
    )}`;
    //compartir
    copyText(text);
    isModalOpen.value = false;
    selectedPokemon.value = undefined;
  }
};

const { fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemons();

// Configurar lista virtualizada
const { list, containerProps, wrapperProps } = useVirtualList(filteredPokemons, {
  itemHeight: 90,
});

// Configurar scroll infinito
useInfiniteScroll(
  containerProps.ref,
  async () => {
    if (hasNextPage.value && !isFetchingNextPage.value && !props.showOnlyFavorites) {
      console.log("Fetching.");
      await fetchNextPage();
    }
  },
  {
    distance: 90, // Cargar más cuando el usuario esté a 90px del final
    canLoadMore: () => {
      return hasNextPage.value;
    },
  }
);
</script>

<template>
  <!-- Toast de confirmación -->
  <ToastMessage :text="'texto copiado'" :show-toast="copied" />
  <div
    v-if="!showOnlyFavorites"
    v-bind="containerProps"
    class="h-screen p-3 w-full flex-1 mb-25 scroll-smooth"
  >
    <div v-bind="wrapperProps" class="h-full overflow-x-hidden">
      <PokemonListItem
        v-for="{ index, data: pokemon } in list"
        :key="index"
        :pokemon="pokemon"
        @click="handlePokemonClick(pokemon)"
        @toggleFavorite="handleToggleFavorite(pokemon)"
      />
    </div>
  </div>

  <div class="flex-1 overflow-hidden mb-25" v-else>
    <div class="h-full overflow-x-hidden">
      <PokemonListItem
        v-for="pokemon in favoritedPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        @click="handlePokemonClick(pokemon)"
        @toggleFavorite="handleToggleFavorite(pokemon)"
      />
    </div>
  </div>

  <!-- Modal de Detalles -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-500 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <PokemonDetail
        v-if="selectedPokemon"
        :is-open="isModalOpen"
        :pokemon="selectedPokemon"
        @close="handleCloseModal"
        @toggleFavorite="handleToggleFavorite(selectedPokemon)"
        @share="handleShare"
        class="fixed inset-0 flex items-center justify-center z-50"
      />
    </Transition>
  </Teleport>
</template>
