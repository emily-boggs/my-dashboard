<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'
</script>

<template>
  <v-app>
    <SideBar />
    <TopBar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
