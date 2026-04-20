<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'

const barData = [
  { day: 'Mon', value: 1620 },
  { day: 'Tue', value: 1843 },
  { day: 'Wed', value: 1507 },
  { day: 'Thu', value: 1972 },
  { day: 'Fri', value: 2134 },
  { day: 'Sat', value: 1389 },
  { day: 'Sun', value: 982 },
]

const maxVal = Math.max(...barData.map(d => d.value))
const heights = ref<string[]>(barData.map(() => '0%'))

onMounted(() => {
  setTimeout(() => {
    heights.value = barData.map(d => ((d.value / maxVal) * 100) + '%')
  }, 100)
})
</script>

<template>
  <DashboardCard title="Shipment Volume – Last 7 Days" icon="mdi-chart-bar" icon-color="info">
      <div class="bar-chart">
        <div v-for="(d, i) in barData" :key="d.day" class="bar-col">
          <div class="bar-fill" :style="{ height: heights[i] }" :data-value="d.value.toLocaleString()"></div>
          <div class="text-caption text-medium-emphasis mt-1">{{ d.day }}</div>
        </div>
      </div>
  </DashboardCard>
</template>

<style scoped>
.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 160px;
}
.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  height: 100%;
}
.bar-fill {
  width: 100%;
  border-radius: 6px 6px 0 0;
  background: linear-gradient(180deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  transition: height 1s ease, opacity 0.25s ease;
  cursor: pointer;
  min-height: 4px;
  position: relative;
  overflow: visible;
}
.bar-fill:hover { opacity: 0.85; }
.bar-fill::after {
  content: attr(data-value);
  position: absolute;
  top: -22px; left: 50%;
  transform: translateX(-50%);
  font-size: 0.68rem;
  font-weight: 700;
  opacity: 0;
  transition: opacity 0.25s ease;
  white-space: nowrap;
  pointer-events: none;
}
.bar-fill:hover::after { opacity: 1; }
</style>
