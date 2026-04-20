<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ActionBtn from '@/components/ActionBtn.vue'

const rail = ref(false)
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
