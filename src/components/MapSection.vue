<script setup lang="ts">
import { ref, computed } from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'
import ActionBtn from '@/components/ActionBtn.vue'

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
  { top: '28%', left: '22%', info: 'CHI → LAX | ETA: 2h', status: 'transit' },
  { top: '38%', left: '18%', info: 'MIA → NYC | DELAYED', status: 'delayed' },
  { top: '22%', left: '48%', info: 'LON → PAR | ETA: 45m', status: 'transit' },
  { top: '32%', left: '55%', info: 'DXB → BOM | ETA: 1h', status: 'transit' },
  { top: '18%', left: '68%', info: 'PEK → TOK | ETA: 3h', status: 'transit' },
  { top: '60%', left: '74%', info: 'SYD → MEL | DELIVERED', status: 'delivered' },
  { top: '25%', left: '14%', info: 'SEA → DEN | ETA: 4h', status: 'transit' },
  { top: '42%', left: '44%', info: 'CAI → JNB | DELAYED', status: 'delayed' },
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
      <div class="d-flex ga-1">
        <ActionBtn
          v-for="f in filters"
          :key="f"
          :variant="activeFilter === f ? 'flat' : 'outlined'"
          :color="activeFilter === f ? 'primary' : undefined"
          @click="activeFilter = f"
        >{{ f }}</ActionBtn>
      </div>
    </template>

    <template #raw>

    <div class="map-canvas">
      <svg class="map-svg" viewBox="0 0 960 500" xmlns="http://www.w3.org/2000/svg">
        <path class="map-land" d="M80,60 L200,50 L260,80 L280,140 L260,180 L230,200 L200,220 L160,240 L120,230 L90,200 L70,160 L60,120 Z" />
        <path class="map-land" d="M160,240 L200,220 L220,250 L210,280 L185,290 L165,270 Z" />
        <path class="map-land" d="M185,290 L230,280 L260,300 L270,360 L250,420 L220,450 L190,440 L170,400 L165,350 L170,310 Z" />
        <path class="map-land" d="M400,60 L470,55 L490,80 L480,110 L450,120 L420,115 L400,95 Z" />
        <path class="map-land" d="M420,140 L480,130 L510,160 L520,220 L510,290 L490,330 L460,340 L430,320 L410,270 L405,210 L410,160 Z" />
        <path class="map-land" d="M490,50 L640,40 L720,60 L750,100 L740,140 L700,160 L650,155 L600,140 L560,120 L510,110 L490,90 Z" />
        <path class="map-land" d="M640,160 L690,155 L710,180 L700,210 L670,220 L645,200 L635,175 Z" />
        <path class="map-land" d="M680,300 L760,290 L800,310 L810,360 L790,400 L750,410 L700,395 L675,360 L670,320 Z" />
      </svg>
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

    <v-divider />

    <div class="d-flex ga-5 pa-3 text-caption text-medium-emphasis">
      <span class="d-flex align-center ga-1"><span class="legend-dot primary-bg"></span>In Transit</span>
      <span class="d-flex align-center ga-1"><span class="legend-dot warning-bg"></span>Delayed</span>
      <span class="d-flex align-center ga-1"><span class="legend-dot success-bg"></span>Delivered</span>
    </div>
    </template>
  </DashboardCard>
</template>

<style scoped>
.map-canvas {
  position: relative;
  background: rgb(var(--v-theme-surface-variant));
  min-height: 300px;
  overflow: hidden;
}
.map-svg { width: 100%; height: 100%; display: block; }
.map-land { fill: rgba(var(--v-theme-primary), 0.15); stroke: rgba(var(--v-border-color), var(--v-border-opacity)); stroke-width: 0.5; }

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

.dot-enter-active, .dot-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.dot-enter-from, .dot-leave-to { opacity: 0; transform: translate(-50%, -50%) scale(0); }
</style>
