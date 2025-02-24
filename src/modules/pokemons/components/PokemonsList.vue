<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from "vue";
import { useClipboard } from "@/composables/useClipboard";
import PokemonListItem from "./PokemonListItem.vue";
import ToastMessage from "./ToastMessage.vue";
import { usePokemons } from "../composables/usePokemon";
import type { Pokemon } from "../interfaces/index.ts";
interface Props {
  searchTerm?: string;
  showOnlyFavorites?: boolean;
}

const props = defineProps<Props>();

const { allPokemons, toggleFavorite } = usePokemons();
// Estado local para pokemons y favoritos

// Computed para filtrar pokemons
const filteredPokemons = computed(() => {
  let result = allPokemons.value;

  // Primero filtramos por favoritos si es necesario
  if (props.showOnlyFavorites) {
    result = result.filter((pokemon) => pokemon.isFavorite);
  }

  if (props.searchTerm) {
    result = result.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(props.searchTerm!.toLowerCase())
    );
  }
  return result;
});

// Manejar cambio de favorito
const handleToggleFavorite = (pokemon: Pokemon) => {
  if (selectedPokemon.value) {
    selectedPokemon.value.isFavorite = !selectedPokemon.value.isFavorite;
  }
  toggleFavorite(pokemon); // Ahora pasamos el objeto pokemon completo
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
</script>

<template>
  <div class="space-y-5 mb-10 w-full">
    <!-- Toast de confirmación -->
    <ToastMessage :text="'texto copiado'" :show-toast="copied" />
    <!-- Lista de Pokémon -->
    <TransitionGroup name="list">
      <PokemonListItem
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        @click="handlePokemonClick(pokemon)"
        @toggleFavorite="handleToggleFavorite(pokemon)"
      />
    </TransitionGroup>

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
  </div>
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
