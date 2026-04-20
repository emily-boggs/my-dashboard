<script setup lang="ts">
import { useTheme } from 'vuetify'
import { ref } from 'vue'
import ActionBtn from '@/components/ActionBtn.vue'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const notifMenu = ref(false)

const notifications = ref([
  { id: 1, icon: 'mdi-alert-circle', color: 'error', title: 'Weather Delay — Chicago', subtitle: 'FF-2026-00412 delayed due to severe storms', time: '12 min ago', read: false },
  { id: 2, icon: 'mdi-check-circle', color: 'success', title: 'Shipment Delivered — Sydney', subtitle: 'FF-2026-00298 delivered to Melbourne', time: '34 min ago', read: false },
  { id: 3, icon: 'mdi-truck-alert', color: 'warning', title: 'Vehicle Breakdown — Denver', subtitle: 'FF-2026-00311 requires rerouting', time: '1 hr ago', read: false },
])

const unreadCount = ref(3)

function markRead(id: number) {
  const n = notifications.value.find(n => n.id === id)
  if (n && !n.read) {
    n.read = true
    unreadCount.value = Math.max(0, unreadCount.value - 1)
  }
}

function markAllRead() {
  notifications.value.forEach(n => n.read = true)
  unreadCount.value = 0
}
</script>

<template>
  <v-app-bar flat class="glass-bar" border="b" style="border-color: rgba(var(--v-border-color), 0.06) !important;">
    <div class="ml-4">
      <div class="text-h6 font-weight-bold" style="letter-spacing: -0.01em;">Dashboard Overview</div>
      <div class="text-caption text-medium-emphasis">FastForward Logistics — April 20, 2026</div>
    </div>

    <v-spacer />

    <ActionBtn
      :icon="theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
      size="small"
      @click="toggleTheme"
    />

    <v-menu v-model="notifMenu" :close-on-content-click="false" offset-y location="bottom end">
      <template #activator="{ props }">
        <ActionBtn icon size="small" class="ml-2" v-bind="props">
          <v-badge v-if="unreadCount > 0" :content="unreadCount" color="error" floating>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
          <v-icon v-else>mdi-bell-outline</v-icon>
        </ActionBtn>
      </template>

      <v-card width="360" variant="flat" class="glass-card">
        <v-card-title class="d-flex align-center justify-space-between py-2 px-4" style="font-size: 0.85rem;">
          Notifications
          <v-btn variant="text" size="x-small" color="primary" @click="markAllRead">Mark all read</v-btn>
        </v-card-title>
        <v-divider />
        <v-list density="compact" max-height="300" style="overflow-y: auto;">
          <v-list-item
            v-for="n in notifications"
            :key="n.id"
            :class="{ 'opacity-50': n.read }"
            @click="markRead(n.id)"
          >
            <template #prepend>
              <v-icon :color="n.color" size="20" class="mr-3">{{ n.icon }}</v-icon>
            </template>
            <v-list-item-title class="text-caption font-weight-bold">{{ n.title }}</v-list-item-title>
            <v-list-item-subtitle class="text-caption">{{ n.subtitle }}</v-list-item-subtitle>
            <template #append>
              <span class="text-caption text-medium-emphasis" style="font-size: 0.65rem; white-space: nowrap;">{{ n.time }}</span>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <ActionBtn size="small" prepend-icon="mdi-refresh" class="ml-2 mr-4">
      Refresh
    </ActionBtn>
  </v-app-bar>
</template>
