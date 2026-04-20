<script setup lang="ts">
import StatsGrid from '@/components/StatsGrid.vue'
import MapSection from '@/components/MapSection.vue'
import DeliveryRates from '@/components/DeliveryRates.vue'
import RegionalPerformance from '@/components/RegionalPerformance.vue'
import ExceptionsTable from '@/components/ExceptionsTable.vue'
import ShipmentChart from '@/components/ShipmentChart.vue'
</script>

<template>
  <v-container fluid class="pa-6">
    <StatsGrid />

    <v-row class="mt-4">
      <v-col cols="12" lg="8">
        <MapSection />
      </v-col>
      <v-col cols="12" lg="4">
        <div class="d-flex flex-column ga-4">
          <DeliveryRates />
          <RegionalPerformance />
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col cols="12">
        <ExceptionsTable />
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col cols="12">
        <ShipmentChart />
      </v-col>
    </v-row>

    <div class="text-center text-caption text-medium-emphasis mt-6 pt-4" style="border-top: 1px solid rgba(var(--v-border-color), 0.06);">      Made with <v-icon color="primary" size="14">mdi-heart</v-icon> Todd's Video Instructions and Copilot
    </div>
  </v-container>
</template>
