<script setup lang="ts">
import DashboardCard from '@/components/DashboardCard.vue'

const regions = [
  { name: 'North America', pct: 96 },
  { name: 'Europe', pct: 92 },
  { name: 'Asia Pacific', pct: 89 },
  { name: 'Middle East', pct: 91 },
  { name: 'Africa', pct: 84 },
]
</script>

<template>
  <DashboardCard title="Regional Performance" icon="mdi-earth">
      <div class="d-flex flex-column ga-3">
        <div v-for="r in regions" :key="r.name" class="d-flex align-center ga-3">
          <span class="text-caption" style="min-width: 90px;">{{ r.name }}</span>
          <v-progress-linear
            :model-value="r.pct"
            color="primary"
            bg-color="surface-variant"
            rounded
            height="6"
            style="flex: 1;"
          />
          <span class="text-caption font-weight-bold text-primary" style="min-width: 32px; text-align: right;">{{ r.pct }}%</span>
        </div>
      </div>
  </DashboardCard>
</template>
