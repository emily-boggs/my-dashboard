<script setup lang="ts">
import { useTheme, useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
import ActionBtn from '@/components/ActionBtn.vue'

const emit = defineEmits<{ 'open-nav': [] }>()
const theme = useTheme()
const { smAndDown } = useDisplay()
const isDark = computed(() => theme.global.current.value.dark)

function toggleTheme() {
  theme.change(isDark.value ? 'light' : 'dark')
}

const notifMenu = ref(false)
const expandedNotif = ref<number | null>(null)

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

function toggleNotif(n: typeof notifications.value[0]) {
  expandedNotif.value = expandedNotif.value === n.id ? null : n.id
  markRead(n.id)
}
</script>

<template>
  <v-app-bar flat class="glass-bar" border="b" style="border-color: rgba(var(--v-border-color), 0.06) !important;">
    <v-app-bar-nav-icon v-if="smAndDown" @click="emit('open-nav')" />
    <div class="ml-4">
      <div class="text-h6 font-weight-bold" style="letter-spacing: -0.01em;">Dashboard Overview</div>
      <div v-if="!smAndDown" class="text-medium-emphasis" style="font-size: 0.65rem;">FastForward Logistics — April 20, 2026</div>
    </div>

    <v-spacer />

    <div class="theme-toggle" :class="{ 'is-light': !isDark }" @click="toggleTheme" role="switch" :aria-checked="!isDark">
      <div class="theme-toggle__track">
        <v-icon class="theme-toggle__icon theme-toggle__icon--sun" size="16">mdi-white-balance-sunny</v-icon>
        <v-icon class="theme-toggle__icon theme-toggle__icon--moon" size="16">mdi-moon-waning-crescent</v-icon>
        <div class="theme-toggle__thumb">
          <v-icon size="14" class="theme-toggle__thumb-icon">
            {{ isDark ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}
          </v-icon>
        </div>
      </div>
    </div>

    <v-menu v-model="notifMenu" :close-on-content-click="false" offset-y location="bottom end">
      <template #activator="{ props }">
        <ActionBtn icon class="ml-2 topbar-btn" v-bind="props">
          <v-badge v-if="unreadCount > 0" :content="unreadCount" color="error" floating>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
          <v-icon v-else>mdi-bell-outline</v-icon>
        </ActionBtn>
      </template>

      <v-card width="360" variant="flat" class="glass-card">
        <v-card-title class="d-flex align-center justify-space-between py-2 px-4" style="font-size: 0.8rem;">
          Notifications
          <v-btn variant="text" size="x-small" color="primary" @click="markAllRead">Mark all read</v-btn>
        </v-card-title>
        <v-divider />
        <v-list density="compact" max-height="300" style="overflow-y: auto;">
          <v-list-item
            v-for="n in notifications"
            :key="n.id"
            :class="{ 'opacity-50': n.read }"
            class="notif-item"
            @click="toggleNotif(n)"
          >
            <template #prepend>
              <v-icon :color="n.color" size="16">{{ n.icon }}</v-icon>
            </template>
            <v-list-item-title style="font-size: 0.72rem; font-weight: 600;">{{ n.title }}</v-list-item-title>
            <v-list-item-subtitle class="notif-subtitle" :class="{ 'notif-subtitle--expanded': expandedNotif === n.id }">{{ n.subtitle }}</v-list-item-subtitle>
            <template #append>
              <span class="text-medium-emphasis" style="font-size: 0.6rem; white-space: nowrap;">{{ n.time }}</span>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <ActionBtn v-if="!smAndDown" prepend-icon="mdi-refresh" class="ml-2 mr-4 topbar-btn">
      Refresh
    </ActionBtn>
    <ActionBtn v-else icon class="ml-2 mr-2 topbar-btn">
      <v-icon>mdi-refresh</v-icon>
    </ActionBtn>
  </v-app-bar>
</template>

<style scoped>
.theme-toggle {
  cursor: pointer;
  user-select: none;
}

.theme-toggle__track {
  position: relative;
  width: 64px;
  height: 34px;
  border-radius: 9999px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  transition: background 0.3s ease, border-color 0.3s ease;
  border: 1px solid rgba(45, 212, 191, 0.5);
}

.is-light .theme-toggle__track {
  background: transparent;
  border-color: rgba(13, 148, 136, 0.5);
}

.theme-toggle__icon {
  color: rgba(255,255,255,0.5);
  z-index: 1;
  transition: color 0.3s ease;
}

.is-light .theme-toggle__icon {
  color: rgba(0,0,0,0.35);
}

.theme-toggle__thumb {
  position: absolute;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(45, 212, 191, 0.15);
  border: 1px solid rgba(45, 212, 191, 0.4);
  top: 50%;
  transform: translateY(-50%);
  right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: right 0.3s ease, left 0.3s ease, background 0.3s ease, border-color 0.3s ease;
  box-shadow: none;
}

.is-light .theme-toggle__thumb {
  right: auto;
  left: 3px;
  background: rgba(13, 148, 136, 0.15);
  border-color: rgba(13, 148, 136, 0.4);
}

.theme-toggle__thumb-icon {
  color: #2dd4bf;
  transition: color 0.3s ease;
}

.is-light .theme-toggle__thumb-icon {
  color: #0d9488;
}

.topbar-btn {
  height: 34px !important;
  min-height: 34px !important;
  max-height: 34px !important;
}

.topbar-btn.v-btn--icon {
  width: 34px !important;
  min-width: 34px !important;
}

.notif-item :deep(.v-list-item__prepend) {
  width: 24px !important;
  min-width: 24px !important;
  margin-inline-end: 0px !important;
  flex-shrink: 0;
}

.notif-subtitle {
  font-size: 0.68rem !important;
}

.notif-subtitle--expanded {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  -webkit-line-clamp: unset !important;
}
</style>
