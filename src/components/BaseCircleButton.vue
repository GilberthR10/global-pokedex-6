// src/components/primitives/buttons/BaseCircleButton.vue
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  testid?: string;
  active?: boolean;
  addCss?: string;
}

const props = withDefaults(defineProps<Props>(), {
  testid: "circle-button",
  active: false,
  addCss: "",
});

const emit = defineEmits<(e: "clicked") => void>();

const handleClick = (event: Event): void => {
  event.stopPropagation();
  emit("clicked");
};

const containerClass = computed(() => {
  const classes = [
    "rounded-full",
    "bg-[#F5F5F5]",
    "flex items-center justify-center",
    "p-2",
    "w-10 h-10",
    "transition-all duration-200",
    "cursor-pointer",
    "hover:scale-105",
  ];
  // Agregar clases adicionales
  if (props.addCss) classes.push(props.addCss);

  return classes.join(" ");
});

const iconClass = computed(() => {
  const classes = ["transition-colors duration-200"];
  // Color del ícono basado en estado
  if (props.active) {
    classes.push("text-amber-400"); // Color dorado cuando está activo
  } else {
    classes.push("text-gray-300"); // Color gris cuando está inactivo
  }
  // Tamaños del ícono
  classes.push("w-full h-full");

  return classes.join(" ");
});
</script>

<template>
  <button
    :data-testid="testid"
    type="button"
    :class="containerClass"
    @click="handleClick"
  >
    <!-- Slot para el ícono -->
    <slot :class="iconClass">
      <!-- Ícono de estrella por defecto -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="iconClass">
        <path
          fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clip-rule="evenodd"
        />
      </svg>
    </slot>
  </button>
</template>
