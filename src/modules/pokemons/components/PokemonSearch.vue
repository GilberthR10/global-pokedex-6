// src/modules/pokemons/components/PokemonSearch.vue
<script setup lang="ts">
import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import IconSearch from "@/components/icons/IconSearch.vue";

const searchInput = ref("");

const emit = defineEmits<{
  (e: "search", term: string): void;
}>();

const debouncedSearch = useDebounceFn((term: string) => {
  emit("search", term);
}, 1000);
</script>

<template>
  <div
    class="relative bg-white rounded-md w-full px-4 py-2.5 flex items-center shadow-md"
  >
    <!-- Icono de búsqueda -->
    <IconSearch class="mr-2" />

    <!-- Input -->
    <input
      v-model="searchInput"
      type="text"
      placeholder="Search"
      @input="debouncedSearch(searchInput)"
      class="w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none text-lg"
    />
  </div>
</template>
