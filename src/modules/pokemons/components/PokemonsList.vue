<script setup lang="ts">
import { ref, computed } from "vue";
import PokemonListItem from "./PokemonListItem.vue";
import PokemonDetail from "./modals/PokemonDetail.vue";

interface Props {
  searchTerm?: string;
  showOnlyFavorites?: boolean;
}

const props = defineProps<Props>();

// Estado local para pokemons y favoritos
const pokemons = ref([
  {
    id: 1,
    name: "Bulbasaur",
    isFavorite: false,
    weight: 69,
    height: 7,
    types: ["Grass", "Poison"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
  },
  {
    id: 2,
    name: "Ivysaur",
    isFavorite: false,
    weight: 130,
    height: 10,
    types: ["Grass", "Poison"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg",
  },
  {
    id: 3,
    name: "Venusaur",
    isFavorite: false,
    weight: 1000,
    height: 20,
    types: ["Grass", "Poison"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg",
  },
  {
    id: 4,
    name: "Charmander",
    isFavorite: false,
    weight: 85,
    height: 6,
    types: ["Fire"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg",
  },
  {
    id: 5,
    name: "Charmeleon",
    isFavorite: false,
    weight: 190,
    height: 11,
    types: ["Fire"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg",
  },
  {
    id: 6,
    name: "Charizard",
    isFavorite: false,
    weight: 905,
    height: 17,
    types: ["Fire", "Flying"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg",
  },
  {
    id: 7,
    name: "Squirtle",
    isFavorite: false,
    weight: 90,
    height: 5,
    types: ["Water"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg",
  },
  {
    id: 8,
    name: "Wartortle",
    isFavorite: false,
    weight: 225,
    height: 10,
    types: ["Water"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/8.svg",
  },
  {
    id: 9,
    name: "Blastoise",
    isFavorite: false,
    weight: 855,
    height: 16,
    types: ["Water"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg",
  },
  {
    id: 10,
    name: "Caterpie",
    isFavorite: false,
    weight: 29,
    height: 3,
    types: ["Bug"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/10.svg",
  },
  {
    id: 11,
    name: "Metapod",
    isFavorite: false,
    weight: 99,
    height: 7,
    types: ["Bug"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/11.svg",
  },
  {
    id: 12,
    name: "Butterfree",
    isFavorite: false,
    weight: 320,
    height: 11,
    types: ["Bug", "Flying"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/12.svg",
  },
  {
    id: 13,
    name: "Weedle",
    isFavorite: false,
    weight: 32,
    height: 3,
    types: ["Bug", "Poison"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/13.svg",
  },
  {
    id: 14,
    name: "Kakuna",
    isFavorite: false,
    weight: 100,
    height: 6,
    types: ["Bug", "Poison"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/14.svg",
  },
  {
    id: 15,
    name: "Beedrill",
    isFavorite: false,
    weight: 295,
    height: 10,
    types: ["Bug", "Poison"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/15.svg",
  },
  {
    id: 16,
    name: "Pidgey",
    isFavorite: false,
    weight: 18,
    height: 3,
    types: ["Normal", "Flying"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/16.svg",
  },
  {
    id: 17,
    name: "Pidgeotto",
    isFavorite: false,
    weight: 300,
    height: 11,
    types: ["Normal", "Flying"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/17.svg",
  },
  {
    id: 18,
    name: "Pidgeot",
    isFavorite: false,
    weight: 395,
    height: 15,
    types: ["Normal", "Flying"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/18.svg",
  },
  {
    id: 19,
    name: "Rattata",
    isFavorite: false,
    weight: 35,
    height: 3,
    types: ["Normal"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/19.svg",
  },
  {
    id: 20,
    name: "Raticate",
    isFavorite: false,
    weight: 185,
    height: 7,
    types: ["Normal"],
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/20.svg",
  },
]);

// Filtrar pokemons basado en el término de búsqueda
/* const filteredPokemons = computed(() => {
  if (!props.searchTerm) return pokemons.value;

  return pokemons.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(props.searchTerm!.toLowerCase())
  );
}); */

// Computed para filtrar pokemons
const filteredPokemons = computed(() => {
  let result = pokemons.value;

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
const handleToggleFavorite = (id: number) => {
  const pokemon = pokemons.value.find((p) => p.id === id);
  if (pokemon) {
    pokemon.isFavorite = !pokemon.isFavorite;
  }
};
// Estado del modal
const isModalOpen = ref(false);
const selectedPokemon = ref<typeof pokemons.value[0] | null>(null);

// Handlers modal
const handlePokemonClick = (pokemon: typeof pokemons.value[0]) => {
  selectedPokemon.value = pokemon;
  isModalOpen.value = true;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
  selectedPokemon.value = null;
};

const handleShare = () => {
  if (selectedPokemon.value) {
    const text = `${
      selectedPokemon.value.name
    }! Types: ${selectedPokemon.value.types.join(", ")}`;
    //compartir
    console.log("Sharing:", text);
  }
};
</script>

<template>
  <div class="space-y-5 mb-10 w-full">
    <!-- Lista de Pokémon -->
    <PokemonListItem
      v-for="pokemon in filteredPokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      @click="handlePokemonClick(pokemon)"
      @toggleFavorite="handleToggleFavorite"
    />

    <!-- Modal de Detalles -->
    <PokemonDetail
      v-if="selectedPokemon"
      :is-open="isModalOpen"
      :pokemon="selectedPokemon"
      @close="handleCloseModal"
      @toggleFavorite="handleToggleFavorite(selectedPokemon.id)"
      @share="handleShare"
    />
  </div>
</template>
