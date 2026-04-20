<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(document.documentElement.getAttribute('data-theme') === 'dark')

function toggleTheme() {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('ff-theme', theme)
}

// Restore saved theme on mount
const saved = localStorage.getItem('ff-theme')
if (saved) {
  document.documentElement.setAttribute('data-theme', saved)
  isDark.value = saved === 'dark'
}
</script>

<template>
  <header class="topbar">
    <div class="topbar-left">
      <h1 class="page-title">Dashboard Overview</h1>
      <span class="page-subtitle">FastForward Logistics — April 19, 2026</span>
    </div>
    <div class="topbar-right">
      <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme">
        <i :class="isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"></i>
      </button>
      <button class="btn-outline">
        <i class="fa-solid fa-bell"></i>
        <span class="badge">3</span>
      </button>
      <button class="btn-outline">
        <i class="fa-solid fa-rotate"></i>
        Refresh
      </button>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  background: var(--topbar-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.topbar-left { display: flex; flex-direction: column; gap: 2px; }
.page-title { font-size: 1.2rem; font-weight: 700; color: var(--text); }
.page-subtitle { font-size: 0.75rem; color: var(--text-muted); }
.topbar-right { display: flex; align-items: center; gap: 10px; }

.theme-toggle {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--bg-3);
  border: 1px solid var(--border);
  color: var(--text-muted);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem;
  transition: color var(--transition), background var(--transition), transform var(--transition);
}
.theme-toggle:hover { color: var(--teal); background: var(--teal-dim); transform: rotate(20deg); }

.badge {
  position: absolute;
  top: -4px; right: -4px;
  background: var(--red);
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  width: 16px; height: 16px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
</style>
