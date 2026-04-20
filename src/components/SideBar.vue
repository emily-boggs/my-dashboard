<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)
const activeSection = ref('dashboard')

const navItems = [
  { id: 'dashboard', icon: 'fa-solid fa-gauge-high', label: 'Dashboard' },
  { id: 'shipments', icon: 'fa-solid fa-boxes-stacked', label: 'Shipments' },
  { id: 'tracking', icon: 'fa-solid fa-map-location-dot', label: 'Live Tracking' },
  { id: 'performance', icon: 'fa-solid fa-chart-line', label: 'Performance' },
  { id: 'regions', icon: 'fa-solid fa-earth-americas', label: 'Regions' },
  { id: 'exceptions', icon: 'fa-solid fa-triangle-exclamation', label: 'Exceptions' },
  { id: 'reports', icon: 'fa-solid fa-file-lines', label: 'Reports' },
  { id: 'settings', icon: 'fa-solid fa-gear', label: 'Settings' },
]

function toggle() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="sidebar-header">
      <div class="logo">
        <i class="fa-solid fa-truck-fast"></i>
        <span class="logo-text">FastForward</span>
      </div>
      <button class="sidebar-toggle" @click="toggle" aria-label="Toggle sidebar">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>

    <nav class="nav-links">
      <a
        v-for="item in navItems"
        :key="item.id"
        href="#"
        class="nav-item"
        :class="{ active: activeSection === item.id }"
        @click.prevent="activeSection = item.id"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </a>
    </nav>

    <div class="sidebar-footer">
      <div class="user-info">
        <div class="avatar"><i class="fa-solid fa-user"></i></div>
        <div class="user-details">
          <span class="user-name">Emily Boggs</span>
          <span class="user-role">Logistics Manager</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: var(--sidebar-w);
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: width var(--transition);
  overflow: hidden;
}
.sidebar.collapsed { width: var(--sidebar-collapsed-w); }

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  border-bottom: 1px solid var(--border);
  min-height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--teal);
  font-weight: 700;
  font-size: 1rem;
  white-space: nowrap;
}
.logo i { font-size: 1.3rem; flex-shrink: 0; }
.logo-text { transition: opacity var(--transition); }
.sidebar.collapsed .logo-text { opacity: 0; width: 0; overflow: hidden; }

.sidebar-toggle {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  width: 30px; height: 30px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: color var(--transition), border-color var(--transition), background var(--transition);
}
.sidebar-toggle:hover { color: var(--teal); border-color: var(--teal); background: var(--teal-dim); }

.nav-links {
  flex: 1;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid transparent;
  transition: color var(--transition), background var(--transition), border-color var(--transition), transform 0.15s ease;
  position: relative;
  overflow: hidden;
}
.nav-item::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 0;
  background: var(--teal);
  border-radius: 0 2px 2px 0;
  transition: width var(--transition);
}
.nav-item:hover,
.nav-item.active {
  color: var(--teal);
  background: var(--teal-dim);
  border-color: rgba(45,212,191,0.2);
  transform: translateX(2px);
}
.nav-item.active::before { width: 3px; }
.nav-item i { font-size: 1rem; flex-shrink: 0; width: 20px; text-align: center; }
.nav-item span { transition: opacity var(--transition); }
.sidebar.collapsed .nav-item span { opacity: 0; width: 0; overflow: hidden; }

.sidebar-footer {
  padding: 14px 10px;
  border-top: 1px solid var(--border);
}
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}
.avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: var(--teal-dim);
  border: 1.5px solid var(--teal);
  display: flex; align-items: center; justify-content: center;
  color: var(--teal);
  font-size: 0.85rem;
  flex-shrink: 0;
}
.user-details { display: flex; flex-direction: column; gap: 1px; }
.user-name { font-size: 0.8rem; font-weight: 600; color: var(--text); }
.user-role { font-size: 0.7rem; color: var(--text-muted); }
.sidebar.collapsed .user-details { display: none; }
</style>
