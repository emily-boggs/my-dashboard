<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'

const sideBar = ref<InstanceType<typeof SideBar> | null>(null)

function openMobileNav() {
  sideBar.value?.openDrawer()
}
</script>

<template>
  <v-app>
    <SideBar ref="sideBar" />
    <TopBar @open-nav="openMobileNav" />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
