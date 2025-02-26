<script setup lang="ts">
import IconSearch from "@/components/icons/IconSearch.vue";

const search = defineModel({ default: "" });
</script>

<template>
  <div
    class="relative bg-white rounded-md w-full px-4 py-2.5 flex items-center shadow-md"
  >
    <IconSearch class="mr-2" />
    <input
      v-model="search"
      type="text"
      placeholder="Search"
      class="w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none text-lg"
      data-testid="search-input"
    />
  </div>
</template>
