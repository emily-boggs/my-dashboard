<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Stat {
  icon: string
  label: string
  target: number
  suffix?: string
  delta: string
  deltaType: 'positive' | 'negative' | 'neutral'
  color: string
}

const stats: Stat[] = [
  { icon: 'fa-solid fa-truck', label: 'Total Shipments', target: 12847, delta: '+4.2% this week', deltaType: 'positive', color: 'teal' },
  { icon: 'fa-solid fa-circle-check', label: 'On-Time Delivery', target: 94, suffix: '%', delta: '+1.3% vs last month', deltaType: 'positive', color: 'green' },
  { icon: 'fa-solid fa-triangle-exclamation', label: 'Open Exceptions', target: 38, delta: '-12 resolved today', deltaType: 'negative', color: 'orange' },
  { icon: 'fa-solid fa-route', label: 'Active Routes', target: 217, delta: 'Stable', deltaType: 'neutral', color: 'blue' },
]

const displayed = ref<string[]>(stats.map(() => '0'))

onMounted(() => {
  stats.forEach((stat, i) => {
    animateCounter(i, stat.target, stat.suffix || '')
  })
})

function animateCounter(index: number, target: number, suffix: string) {
  const duration = 1400
  const start = performance.now()

  function step(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayed.value[index] = Math.floor(eased * target).toLocaleString() + suffix
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const deltaIcons: Record<string, string> = {
  positive: 'fa-solid fa-arrow-trend-up',
  negative: 'fa-solid fa-arrow-trend-down',
  neutral: 'fa-solid fa-minus',
}
</script>

<template>
  <section class="stats-grid">
    <div v-for="(stat, i) in stats" :key="stat.label" class="stat-card">
      <div class="stat-icon" :class="stat.color">
        <i :class="stat.icon"></i>
      </div>
      <div class="stat-body">
        <span class="stat-label">{{ stat.label }}</span>
        <span class="stat-value">{{ displayed[i] }}</span>
        <span class="stat-delta" :class="stat.deltaType">
          <i :class="deltaIcons[stat.deltaType]"></i> {{ stat.delta }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 24px 28px 0;
}
.stat-card {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--card-shadow);
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
  cursor: default;
}
.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  border-color: var(--teal);
}
.stat-icon {
  width: 46px; height: 46px;
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}
.stat-icon.teal  { background: rgba(45,212,191,0.15); color: var(--teal); }
.stat-icon.green { background: rgba(74,222,128,0.15); color: var(--green); }
.stat-icon.orange{ background: rgba(251,146,60,0.15); color: var(--orange); }
.stat-icon.blue  { background: rgba(56,189,248,0.15); color: var(--blue); }

.stat-body { display: flex; flex-direction: column; gap: 2px; }
.stat-label { font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
.stat-value { font-size: 1.7rem; font-weight: 700; color: var(--text); line-height: 1.1; }
.stat-delta { font-size: 0.72rem; display: flex; align-items: center; gap: 4px; }
.stat-delta.positive { color: var(--green); }
.stat-delta.negative { color: var(--teal); }
.stat-delta.neutral  { color: var(--text-muted); }

@media (max-width: 1100px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px)  { .stats-grid { grid-template-columns: 1fr; padding: 16px; } }
</style>
