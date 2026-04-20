<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'x-small' | 'small'
  icon?: string | boolean
  prependIcon?: string
  appendIcon?: string
  variant?: 'outlined' | 'flat'
  color?: string
}>(), {
  size: 'x-small',
  variant: 'outlined',
})
</script>

<template>
  <v-btn
    :size="size"
    :variant="variant"
    :color="color"
    :icon="icon"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
  >
    <slot />
  </v-btn>
</template>
