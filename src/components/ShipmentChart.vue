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

const total = barData.reduce((s, d) => s + d.value, 0)
const avg = Math.round(total / barData.length)
const peak = barData.reduce((a, b) => a.value > b.value ? a : b)

const maxVal = Math.max(...barData.map(d => d.value))
const ceilVal = Math.ceil(maxVal / 500) * 500
const yTicks = Array.from({ length: 5 }, (_, i) => Math.round(ceilVal * (1 - i / 4)))

const heights = ref<string[]>(barData.map(() => '0%'))

onMounted(() => {
  setTimeout(() => {
    heights.value = barData.map(d => ((d.value / ceilVal) * 100) + '%')
  }, 100)
})
</script>

<template>
  <DashboardCard title="Shipment Volume – Last 7 Days" icon="mdi-chart-bar" icon-color="info">
    <template #actions>
      <div class="d-flex ga-5 flex-wrap" style="font-size: 0.65rem;">
        <div class="text-medium-emphasis">Total: <span class="font-weight-bold text-high-emphasis">{{ total.toLocaleString() }}</span></div>
        <div class="text-medium-emphasis">Avg: <span class="font-weight-bold text-high-emphasis">{{ avg.toLocaleString() }}/day</span></div>
        <div class="text-medium-emphasis">Peak: <span class="font-weight-bold text-primary">{{ peak.day }} ({{ peak.value.toLocaleString() }})</span></div>
      </div>
    </template>

    <div class="chart-wrapper">
      <div class="y-axis">
        <span v-for="tick in yTicks" :key="tick" class="y-tick">{{ tick >= 1000 ? (tick / 1000).toFixed(1) + 'k' : tick }}</span>
      </div>
      <div class="chart-area">
        <div class="gridlines">
          <div v-for="tick in yTicks" :key="tick" class="gridline"></div>
        </div>
        <div class="bar-chart">
          <div v-for="(d, i) in barData" :key="d.day" class="bar-col">
            <div class="bar-value text-caption font-weight-bold" :style="{ opacity: heights[i] === '0%' ? 0 : 1 }">{{ d.value.toLocaleString() }}</div>
            <div class="bar-fill" :style="{ height: heights[i] }"></div>
            <div class="text-caption text-medium-emphasis mt-2">{{ d.day }}</div>
          </div>
        </div>
      </div>
    </div>
  </DashboardCard>
</template>

<style scoped>
.chart-wrapper {
  display: flex;
  gap: 8px;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
  padding-bottom: 28px;
  min-width: 32px;
  text-align: right;
}

.y-tick {
  font-size: 0.65rem;
  color: rgba(var(--v-theme-on-surface), 0.4);
  line-height: 1;
}

.chart-area {
  flex: 1;
  position: relative;
}

.gridlines {
  position: absolute;
  inset: 0;
  bottom: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}

.gridline {
  border-bottom: 1px solid rgba(var(--v-border-color), 0.06);
  height: 0;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 180px;
  position: relative;
}

.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}

.bar-value {
  margin-bottom: 4px;
  font-size: 0.7rem;
  transition: opacity 0.6s ease;
}

.bar-fill {
  width: 100%;
  border-radius: 6px 6px 0 0;
  background: linear-gradient(180deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  transition: height 1s ease, opacity 0.25s ease;
  cursor: pointer;
  min-height: 4px;
}

.bar-fill:hover {
  opacity: 0.85;
}
</style>
