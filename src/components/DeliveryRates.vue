<template>
  <DashboardCard title="Delivery Rates" icon="mdi-chart-donut">
      <div class="d-flex align-center ga-4">
        <svg class="donut-chart" viewBox="0 0 120 120">
          <circle class="donut-bg" cx="60" cy="60" r="50" />
          <circle class="donut-segment primary-stroke" cx="60" cy="60" r="50"
            stroke-dasharray="295.31 314.16" stroke-dashoffset="0" />
          <circle class="donut-segment success-stroke" cx="60" cy="60" r="50"
            stroke-dasharray="12.57 314.16" stroke-dashoffset="-295.31" />
          <circle class="donut-segment warning-stroke" cx="60" cy="60" r="50"
            stroke-dasharray="6.28 314.16" stroke-dashoffset="-307.88" />
          <text x="60" y="56" class="donut-center-val">94%</text>
          <text x="60" y="70" class="donut-center-label">On-Time</text>
        </svg>
        <div class="d-flex flex-column ga-1 text-caption text-medium-emphasis">
          <div class="d-flex align-center ga-1"><span class="legend-dot primary-bg"></span> On-Time: 94%</div>
          <div class="d-flex align-center ga-1"><span class="legend-dot success-bg"></span> Early: 4%</div>
          <div class="d-flex align-center ga-1"><span class="legend-dot warning-bg"></span> Late: 2%</div>
        </div>
      </div>
  </DashboardCard>
</template>

<script setup lang="ts">
import DashboardCard from '@/components/DashboardCard.vue'
</script>

<style scoped>
.donut-chart { width: 100px; height: 100px; flex-shrink: 0; }
.donut-bg { fill: none; stroke: rgb(var(--v-theme-surface-variant)); stroke-width: 12; }
.donut-segment {
  fill: none;
  stroke-width: 12;
  transform: rotate(-90deg);
  transform-origin: 60px 60px;
  transition: stroke-dasharray 1s ease;
}
.donut-segment.primary-stroke { stroke: rgb(var(--v-theme-primary)); }
.donut-segment.success-stroke { stroke: rgb(var(--v-theme-success)); }
.donut-segment.warning-stroke { stroke: rgb(var(--v-theme-warning)); }

.donut-center-val {
  font-size: 18px; font-weight: 700; fill: rgb(var(--v-theme-on-surface));
  text-anchor: middle; font-family: 'Open Sans', sans-serif;
}
.donut-center-label {
  font-size: 8px; fill: rgba(var(--v-theme-on-surface), 0.6);
  text-anchor: middle; font-family: 'Open Sans', sans-serif;
}

.legend-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; }
.legend-dot.primary-bg { background: rgb(var(--v-theme-primary)); }
.legend-dot.success-bg { background: rgb(var(--v-theme-success)); }
.legend-dot.warning-bg { background: rgb(var(--v-theme-warning)); }
</style>
