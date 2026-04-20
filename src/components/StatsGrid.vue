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
  { icon: 'mdi-truck', label: 'Total Shipments', target: 12847, delta: '+4.2% this week', deltaType: 'positive', color: 'primary' },
  { icon: 'mdi-check-circle', label: 'On-Time Delivery', target: 94, suffix: '%', delta: '+1.3% vs last month', deltaType: 'positive', color: 'success' },
  { icon: 'mdi-alert', label: 'Open Exceptions', target: 38, delta: '-12 resolved today', deltaType: 'negative', color: 'warning' },
  { icon: 'mdi-routes', label: 'Active Routes', target: 217, delta: 'Stable', deltaType: 'neutral', color: 'info' },
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
  positive: 'mdi-trending-up',
  negative: 'mdi-trending-down',
  neutral: 'mdi-minus',
}

const deltaColors: Record<string, string> = {
  positive: 'success',
  negative: 'primary',
  neutral: 'medium-emphasis',
}
</script>

<template>
  <v-row>
    <v-col v-for="(stat, i) in stats" :key="stat.label" cols="12" sm="6" lg="3">
      <v-card variant="flat" hover class="glass-card pa-4">
        <div class="d-flex align-center ga-4">
          <v-avatar :color="stat.color" variant="tonal" size="46" rounded="lg">
            <v-icon size="22">{{ stat.icon }}</v-icon>
          </v-avatar>
          <div>
            <div class="text-caption text-uppercase text-medium-emphasis font-weight-medium" style="line-height: 1.2; letter-spacing: 0.06em;">{{ stat.label }}</div>
            <div class="text-h4 font-weight-bold" style="letter-spacing: -0.02em;">{{ displayed[i] }}</div>
            <div class="d-flex align-center ga-1" :class="`text-${deltaColors[stat.deltaType]}`" style="font-size: 0.72rem;">
              <v-icon size="14">{{ deltaIcons[stat.deltaType] }}</v-icon>
              {{ stat.delta }}
            </div>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
