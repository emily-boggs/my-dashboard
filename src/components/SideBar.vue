<script setup lang="ts">
import { ref } from 'vue'
import ActionBtn from '@/components/ActionBtn.vue'

const rail = ref(false)
const activeSection = ref('dashboard')

const navItems = [
  { id: 'dashboard', icon: 'mdi-gauge', label: 'Dashboard' },
  { id: 'shipments', icon: 'mdi-package-variant-closed', label: 'Shipments' },
  { id: 'tracking', icon: 'mdi-map-marker-radius', label: 'Live Tracking' },
  { id: 'performance', icon: 'mdi-chart-line', label: 'Performance' },
  { id: 'regions', icon: 'mdi-earth', label: 'Regions' },
  { id: 'exceptions', icon: 'mdi-alert', label: 'Exceptions' },
  { id: 'reports', icon: 'mdi-file-document-outline', label: 'Reports' },
  { id: 'settings', icon: 'mdi-cog', label: 'Settings' },
]
</script>

<template>
  <v-navigation-drawer
    :rail="rail"
    permanent
    color="background"
    class="sidebar-drawer"
  >
    <div class="d-flex align-center justify-space-between pa-4">
      <div class="d-flex align-center ga-2">
        <v-icon color="primary" size="24">mdi-truck-fast</v-icon>
        <span v-show="!rail" class="text-subtitle-2 font-weight-bold text-primary">FastForward</span>
      </div>
      <ActionBtn
        :icon="rail ? 'mdi-menu' : 'mdi-menu-open'"
        @click="rail = !rail"
      />
    </div>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.id"
        :prepend-icon="item.icon"
        :title="item.label"
        :active="activeSection === item.id"
        color="primary"
        rounded="lg"
        @click="activeSection = item.id"
      />
    </v-list>

    <template #append>
      <v-divider />
      <div class="pa-3">
        <div class="d-flex align-center ga-3">
          <v-avatar size="32" color="primary" variant="tonal">
            <v-icon size="18">mdi-account</v-icon>
          </v-avatar>
          <div v-show="!rail">
            <div class="text-caption font-weight-bold">Emily Boggs</div>
            <div class="text-caption text-medium-emphasis">Logistics Manager</div>
          </div>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.sidebar-drawer {
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
}
</style>
