<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'x-small' | 'small'
  icon?: string | boolean
  prependIcon?: string
  appendIcon?: string
  variant?: 'outlined' | 'flat' | 'tonal'
  color?: string
  rounded?: string
}>(), {
  size: 'x-small',
  variant: 'tonal',
  color: 'primary',
  rounded: 'pill',
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
    :rounded="rounded"
    class="action-btn"
  >
    <slot />
  </v-btn>
</template>

<style scoped>
.action-btn {
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  font-weight: 600 !important;
  font-size: 12px !important;
  padding: 16px 16px !important;
  border-radius: 9999px !important;
  border: 1px solid rgba(var(--v-theme-primary), 0.5) !important;
  color: #fff !important;
}
</style>
