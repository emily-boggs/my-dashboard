<script setup lang="ts">
import { ref } from 'vue'

const activeFilter = ref('All')
const filters = ['All', 'In Transit', 'Delayed', 'Delivered']

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
  <div class="map-container">
    <div class="map-header">
      <span><i class="fa-solid fa-satellite-dish"></i> Live Shipment Tracking</span>
      <div class="map-controls">
        <button
          v-for="f in filters"
          :key="f"
          class="btn-outline small"
          :class="{ active: activeFilter === f }"
          @click="activeFilter = f"
        >{{ f }}</button>
      </div>
    </div>
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
      <div
        v-for="(dot, i) in dots"
        :key="i"
        class="shipment-dot"
        :class="{ delayed: dot.status === 'delayed', delivered: dot.status === 'delivered' }"
        :style="{ top: dot.top, left: dot.left }"
        @mouseenter="showTooltip($event, dot.info)"
        @mousemove="moveTooltip"
        @mouseleave="hideTooltip"
      ></div>
      <div class="map-tooltip" :style="tooltipStyle">{{ tooltipText }}</div>
    </div>
    <div class="map-legend">
      <span><span class="legend-dot teal"></span>In Transit</span>
      <span><span class="legend-dot orange"></span>Delayed</span>
      <span><span class="legend-dot green"></span>Delivered</span>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
}
.map-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
  gap: 12px;
  flex-wrap: wrap;
}
.map-header i { color: var(--teal); margin-right: 6px; }
.map-controls { display: flex; gap: 6px; }

.map-canvas {
  position: relative;
  background: var(--map-water);
  flex: 1;
  min-height: 300px;
  overflow: hidden;
}
.map-svg { width: 100%; height: 100%; display: block; }
.map-land { fill: var(--map-land); stroke: var(--border); stroke-width: 0.5; }

.shipment-dot {
  position: absolute;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--teal);
  border: 2px solid var(--bg);
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
  border: 1.5px solid var(--teal);
  animation: ripple 2s ease-out infinite;
}
.shipment-dot.delayed { background: var(--orange); }
.shipment-dot.delayed::after { border-color: var(--orange); }
.shipment-dot.delivered { background: var(--green); animation: none; }
.shipment-dot.delivered::after { border-color: var(--green); animation: none; }

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
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text);
  pointer-events: none;
  white-space: nowrap;
  transition: opacity 0.15s;
  z-index: 20;
}

.map-legend {
  display: flex;
  gap: 20px;
  padding: 10px 18px;
  border-top: 1px solid var(--border);
  font-size: 0.75rem;
  color: var(--text-muted);
  flex-wrap: wrap;
}
</style>
