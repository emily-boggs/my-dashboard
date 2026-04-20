<script setup lang="ts">
defineProps<{
  color?: string
}>()
</script>

<template>
  <v-chip :color="color" size="x-small" variant="tonal" label>
    <slot />
  </v-chip>
</template>
