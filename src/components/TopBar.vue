<script setup lang="ts">
import { useTheme } from 'vuetify'
import ActionBtn from '@/components/ActionBtn.vue'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-app-bar flat color="surface" border="b">
    <div class="ml-4">
      <div class="text-subtitle-1 font-weight-bold">Dashboard Overview</div>
      <div class="text-caption text-medium-emphasis">FastForward Logistics — April 20, 2026</div>
    </div>

    <v-spacer />

    <ActionBtn
      :icon="theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
      size="small"
      @click="toggleTheme"
    />
    <ActionBtn icon size="small" class="ml-2">
      <v-badge color="error" content="3" floating>
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </ActionBtn>
    <ActionBtn size="small" prepend-icon="mdi-refresh" class="ml-2 mr-4">
      Refresh
    </ActionBtn>
  </v-app-bar>
</template>
