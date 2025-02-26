<script setup lang="ts">
import { ref, computed } from "vue";
import ToastMessage from "./ToastMessage.vue";
import { useInfiniteScroll, useVirtualList } from "@vueuse/core";
import PokemonListItem from "./PokemonListItem.vue";
import PokemonDetail from "./modals/PokemonDetail.vue";

import type { Pokemon } from "../interfaces/index.ts";
import { usePokemons } from "../composables/usePokemon";
import { useClipboard } from "@/composables/useClipboard";
import IconLoader from "@/components/icons/IconLoader.vue";

interface Props {
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
    const { name, weight, height, types } = selectedPokemon.value;

    const typesText = types.map((t) => t.type.name).join(", ");

    const text = `Name: ${name}, Weight: ${weight}, Height: ${height}, Types: ${typesText}`;

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
    <p v-if="!hasNextPage" class="text-gray-600 text-3xl text-center capitalize">
      you reached the end
    </p>
    <div v-if="isFetchingNextPage" class="flex justify-center items-center py-2">
      <IconLoader class="w-10 h-10 animate-spin" />
    </div>
  </div>

  <div class="flex-1 overflow-hidden mb-25" v-else>
    <div class="h-full overflow-x-hidden">
      <div
        v-if="favoritedPokemons.length == 0"
        class="text-center py-2 flex-col space-y-5"
      >
        <div class="text-4xl">Uh-oh!</div>
        <p class="text-gray-600">Your Favorite Pokemon List is empty</p>
      </div>
      <TransitionGroup name="list">
        <PokemonListItem
          v-for="pokemon in favoritedPokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
          @click="handlePokemonClick(pokemon)"
          @toggleFavorite="handleToggleFavorite(pokemon)"
        />
      </TransitionGroup>
    </div>
  </div>

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
<style lang="css" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
