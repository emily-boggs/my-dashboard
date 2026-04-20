<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'
</script>

<template>
  <SideBar />
  <main class="main-content">
    <RouterView />
  </main>
</template>

<style scoped>
.main-content {
  margin-left: var(--sidebar-w);
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left var(--transition);
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .main-content { margin-left: var(--sidebar-collapsed-w); }
}
</style>
