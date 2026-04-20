<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const hovered = ref(false)
const route = useRoute()
const router = useRouter()

const navItems = [
  { to: '/', icon: 'mdi-gauge', label: 'Dashboard' },
  { to: '/exceptions', icon: 'mdi-alert', label: 'Exceptions' },
  { to: '/settings', icon: 'mdi-cog', label: 'Settings' },
]
</script>

<template>
  <v-navigation-drawer
    :rail="!hovered"
    permanent
    class="glass-sidebar"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    style="transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);"
  >
    <div class="d-flex align-center pa-4 ga-2" style="height: 56px;">
      <v-icon color="primary" size="24">mdi-truck-fast</v-icon>
      <Transition name="fade">
        <span v-show="hovered" class="text-subtitle-2 font-weight-bold text-primary" style="white-space: nowrap;">FastForward</span>
      </Transition>
    </div>

    <v-divider style="opacity: 0.08;" />

    <v-list density="compact" nav class="mt-1">
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        :prepend-icon="item.icon"
        :title="item.label"
        :to="item.to"
        color="primary"
        rounded="lg"
        exact
      />
    </v-list>

    <template #append>
      <v-divider style="opacity: 0.08;" />
      <div class="pa-3">
        <div class="d-flex align-center ga-3">
          <v-avatar size="32" color="primary" variant="tonal">
            <v-icon size="18">mdi-account</v-icon>
          </v-avatar>
          <Transition name="fade">
            <div v-show="hovered">
              <div class="text-caption font-weight-bold">Emily Boggs</div>
              <div class="text-caption text-medium-emphasis">Logistics Manager</div>
            </div>
          </Transition>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
