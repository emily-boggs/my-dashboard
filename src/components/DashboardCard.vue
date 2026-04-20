<script setup lang="ts">
defineProps<{
  title?: string
  icon?: string
  iconColor?: string
  hover?: boolean
}>()
</script>

<template>
  <v-card variant="outlined" :hover="hover">
    <v-card-title
      v-if="title"
      class="d-flex align-center justify-space-between py-3 px-4"
      style="font-size: 0.9rem;"
    >
      <span class="d-flex align-center ga-2">
        <v-icon v-if="icon" :color="iconColor ?? 'primary'" size="18">{{ icon }}</v-icon>
        {{ title }}
      </span>
      <slot name="actions" />
    </v-card-title>
    <v-divider v-if="title" />
    <v-card-text v-if="$slots.default">
      <slot />
    </v-card-text>
    <slot name="raw" />
  </v-card>
</template>
