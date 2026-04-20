<script setup lang="ts">
defineProps<{
  title?: string
  icon?: string
  iconColor?: string
  hover?: boolean
}>()
</script>

<template>
  <v-card variant="flat" :hover="hover" class="glass-card">
    <v-card-title
      v-if="title"
      class="d-flex align-center justify-space-between py-3 px-4"
    >
      <span class="d-flex align-center ga-2 text-subtitle-2 font-weight-bold">
        <v-icon v-if="icon" :color="iconColor ?? 'primary'" size="18">{{ icon }}</v-icon>
        {{ title }}
      </span>
      <slot name="actions" />
    </v-card-title>
    <v-divider v-if="title" style="opacity: 0.08;" />
    <v-card-text v-if="$slots.default">
      <slot />
    </v-card-text>
    <slot name="raw" />
  </v-card>
</template>
