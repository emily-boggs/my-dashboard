<script setup lang="ts">
import { onMounted, ref } from 'vue'

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
  <section class="chart-section">
    <div class="section-header">
      <h2><i class="fa-solid fa-chart-bar"></i> Shipment Volume – Last 7 Days</h2>
    </div>
    <div class="bar-chart-wrap">
      <div class="bar-chart">
        <div v-for="(d, i) in barData" :key="d.day" class="bar-col">
          <div class="bar-fill" :style="{ height: heights[i] }" :data-value="d.value.toLocaleString()"></div>
          <div class="bar-label">{{ d.day }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chart-section {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  padding-bottom: 20px;
}
.chart-section .section-header { border-bottom: 1px solid var(--border); }
.chart-section .section-header h2 i { color: var(--blue); }

.bar-chart-wrap { padding: 20px 28px 10px; }
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
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  background: linear-gradient(180deg, var(--teal), var(--blue));
  transition: height 1s ease, opacity var(--transition);
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
  color: var(--text);
  opacity: 0;
  transition: opacity var(--transition);
  white-space: nowrap;
  pointer-events: none;
}
.bar-fill:hover::after { opacity: 1; }

.bar-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-top: 6px;
  text-align: center;
}
</style>
