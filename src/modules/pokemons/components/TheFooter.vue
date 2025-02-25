<template>
  <div class="flex place-content-center gap-10 py-4 px-8 w-full">
    <BaseButton
      :active="activeButton === 'all'"
      icon-position="left"
      @clicked="handleButtonClick(ButtonTypes.ALL)"
    >
      <template #icon>
        <ListIcon />
      </template>
      <template #default>All</template>
    </BaseButton>
    <BaseButton
      :active="activeButton === 'favorites'"
      icon-position="left"
      @clicked="handleButtonClick(ButtonTypes.FAVORITES)"
    >
      <template #icon>
        <StarIcon />
      </template>
      <template #default>Favorites</template>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import ListIcon from "@/components/icons/IconAll.vue";
import StarIcon from "@/components/icons/IconStar.vue";

enum ButtonTypes {
  ALL = "all",
  FAVORITES = "favorites",
}

const emit = defineEmits<{
  (e: "changeView", view: ButtonTypes): void;
}>();

const activeButton = ref<ButtonTypes>(ButtonTypes.ALL);

const handleButtonClick = (type: ButtonTypes) => {
  if (activeButton.value === type) {
    return;
  }
  activeButton.value = type;
  emit("changeView", type);
};
</script>
