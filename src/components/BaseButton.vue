// src/components/primitives/buttons/ElButton.vue
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Button variant determines the visual style */
  variant?: 'primary' | 'secondary'
  /** the button is in active state */
  active?: boolean
  iconPosition?: 'left' | 'right'
  addCss?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  active: false,
  iconPosition: 'left',
  addCss: ''
})

// Define events that can be emitted
const emit = defineEmits<(e: 'clicked') => void>()

// Click handler - only emit if not disabled
const handleClick = () => {
  emit('clicked')
}

// Compute CSS classes based on variant and state
const cssClass = computed(() => {
  const classes = [
    // Base classes
    'inline-flex items-center justify-center',
    'font-medium rounded-full text-sm min-w-36 min-h-11 gap-3 md:w-50',
    'focus:outline-none',
    'transition-colors duration-200',
  ]

  // Variant specific classes
  if (props.active) {
    classes.push('bg-red-600 text-white')
    classes.push('active:bg-red-700')
  } else {
    classes.push('bg-[#BFBFBF] text-white')
  }
  // Add any additional CSS classes
  if (props.addCss) {
    classes.push(props.addCss)
  }

  return classes.join(' ')
})
</script>

<template>
  <button v-bind="$attrs" :class="cssClass" @click="handleClick">
    <!-- Left icon slot -->
    <template v-if="iconPosition === 'left'">
      <slot name="icon" class="w-5 h-5 mr-2" />
    </template>

    <!-- Default slot for button content -->
    <slot />

    <!-- Right icon slot -->
    <template v-if="iconPosition === 'right'">
      <slot name="icon" class="w-5 h-5 ml-2" />
    </template>
  </button>
</template>
