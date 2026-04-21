<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'
import ActionBtn from '@/components/ActionBtn.vue'
import worldMapSvg from '@/assets/world-map.svg?raw'

const activeFilter = ref('All')
const filters = ['All', 'In Transit', 'Delayed', 'Delivered']

const filterMap: Record<string, string> = {
  'In Transit': 'transit',
  'Delayed': 'delayed',
  'Delivered': 'delivered',
}

interface Dot {
  top: string
  left: string
  info: string
  status: 'transit' | 'delayed' | 'delivered'
}

const dots: Dot[] = [
  { top: '24.1%', left: '27.7%', info: 'CHI → LAX | ETA: 2h', status: 'transit' },
  { top: '34.1%', left: '28.4%', info: 'MIA → NYC | DELAYED', status: 'delayed' },
  { top: '18.3%', left: '50.0%', info: 'LON → PAR | ETA: 45m', status: 'transit' },
  { top: '34.4%', left: '64.9%', info: 'DXB → BOM | ETA: 1h', status: 'transit' },
  { top: '25.3%', left: '79.8%', info: 'PEK → TOK | ETA: 3h', status: 'transit' },
  { top: '73.4%', left: '87.5%', info: 'SYD → MEL | DELIVERED', status: 'delivered' },
  { top: '20.6%', left: '19.8%', info: 'SEA → DEN | ETA: 4h', status: 'transit' },
  { top: '31.4%', left: '58.3%', info: 'CAI → JNB | DELAYED', status: 'delayed' },
]

const filteredDots = computed(() => {
  if (activeFilter.value === 'All') return dots
  const status = filterMap[activeFilter.value]
  return dots.filter(d => d.status === status)
})

const tooltipText = ref('')
const tooltipStyle = ref({ left: '0px', top: '0px', opacity: '0' })

function showTooltip(e: MouseEvent, info: string) {
  tooltipText.value = info
  const canvas = (e.currentTarget as HTMLElement).closest('.map-canvas') as HTMLElement
  const rect = canvas.getBoundingClientRect()
  let x = e.clientX - rect.left + 12
  let y = e.clientY - rect.top - 28
  if (x + 160 > rect.width) x = e.clientX - rect.left - 170
  if (y < 0) y = e.clientY - rect.top + 12
  tooltipStyle.value = { left: x + 'px', top: y + 'px', opacity: '1' }
}

function moveTooltip(e: MouseEvent) {
  const canvas = (e.currentTarget as HTMLElement).closest('.map-canvas') as HTMLElement
  const rect = canvas.getBoundingClientRect()
  let x = e.clientX - rect.left + 12
  let y = e.clientY - rect.top - 28
  if (x + 160 > rect.width) x = e.clientX - rect.left - 170
  if (y < 0) y = e.clientY - rect.top + 12
  tooltipStyle.value = { ...tooltipStyle.value, left: x + 'px', top: y + 'px' }
}

function hideTooltip() {
  tooltipStyle.value = { ...tooltipStyle.value, opacity: '0' }
}
</script>

<template>
  <DashboardCard title="Live Shipment Tracking" icon="mdi-satellite-uplink">
    <template #actions>
      <div class="d-flex ga-1 flex-wrap">
        <ActionBtn
          :variant="activeFilter === 'All' ? 'flat' : 'tonal'"
          color="primary"
          @click="activeFilter = 'All'"
        >All</ActionBtn>
        <ActionBtn
          :variant="activeFilter === 'In Transit' ? 'flat' : 'tonal'"
          color="primary"
          @click="activeFilter = 'In Transit'"
        ><span class="filter-dot primary-bg"></span>In Transit</ActionBtn>
        <ActionBtn
          :variant="activeFilter === 'Delayed' ? 'flat' : 'tonal'"
          color="primary"
          @click="activeFilter = 'Delayed'"
        ><span class="filter-dot warning-bg"></span>Delayed</ActionBtn>
        <ActionBtn
          :variant="activeFilter === 'Delivered' ? 'flat' : 'tonal'"
          color="primary"
          @click="activeFilter = 'Delivered'"
        ><span class="filter-dot success-bg"></span>Delivered</ActionBtn>
      </div>
    </template>

    <template #raw>

    <div class="map-canvas">
      <div class="map-svg-wrapper" v-html="worldMapSvg"></div>
      <TransitionGroup name="dot">
        <div
          v-for="(dot, i) in filteredDots"
          :key="dot.info"
          class="shipment-dot"
          :class="{ delayed: dot.status === 'delayed', delivered: dot.status === 'delivered' }"
          :style="{ top: dot.top, left: dot.left }"
          @mouseenter="showTooltip($event, dot.info)"
          @mousemove="moveTooltip"
          @mouseleave="hideTooltip"
        ></div>
      </TransitionGroup>
      <div class="map-tooltip" :style="tooltipStyle">{{ tooltipText }}</div>
    </div>
    </template>
  </DashboardCard>
</template>

<style scoped>
.map-canvas {
  position: relative;
  background: transparent;
  min-height: 300px;
  overflow: hidden;
}
.map-svg-wrapper { width: 100%; height: 100%; display: block; }
.map-svg-wrapper :deep(svg) { width: 100%; height: 100%; display: block; }
.map-svg-wrapper :deep(path) { fill: rgba(var(--v-theme-primary), 0.15); stroke: rgba(var(--v-border-color), var(--v-border-opacity)); stroke-width: 0.5; }

.shipment-dot {
  position: absolute;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: rgb(var(--v-theme-primary));
  border: 2px solid rgb(var(--v-theme-background));
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 5;
  animation: dotPulse 2s ease-in-out infinite;
}
.shipment-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1.5px solid rgb(var(--v-theme-primary));
  animation: ripple 2s ease-out infinite;
}
.shipment-dot.delayed { background: rgb(var(--v-theme-warning)); }
.shipment-dot.delayed::after { border-color: rgb(var(--v-theme-warning)); }
.shipment-dot.delivered { background: rgb(var(--v-theme-success)); animation: none; }
.shipment-dot.delivered::after { border-color: rgb(var(--v-theme-success)); animation: none; }

@keyframes dotPulse {
  0%, 100% { transform: translate(-50%,-50%) scale(1); }
  50%       { transform: translate(-50%,-50%) scale(1.2); }
}
@keyframes ripple {
  0%   { inset: -2px; opacity: 1; }
  100% { inset: -12px; opacity: 0; }
}

.map-tooltip {
  position: absolute;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.75rem;
  font-weight: 500;
  pointer-events: none;
  white-space: nowrap;
  transition: opacity 0.15s;
  z-index: 20;
}

.legend-dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
}
.legend-dot.primary-bg { background: rgb(var(--v-theme-primary)); }
.legend-dot.warning-bg { background: rgb(var(--v-theme-warning)); }
.legend-dot.success-bg { background: rgb(var(--v-theme-success)); }

.filter-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
  flex-shrink: 0;
}
.filter-dot.primary-bg { background: rgb(var(--v-theme-primary)); }
.filter-dot.warning-bg { background: rgb(var(--v-theme-warning)); }
.filter-dot.success-bg { background: rgb(var(--v-theme-success)); }

.dot-enter-active, .dot-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.dot-enter-from, .dot-leave-to { opacity: 0; transform: translate(-50%, -50%) scale(0); }
</style>
