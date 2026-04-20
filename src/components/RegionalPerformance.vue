<template>
  <div class="panel-section">
    <h3 class="panel-title"><i class="fa-solid fa-earth-americas"></i> Regional Performance</h3>
    <div class="region-list">
      <div v-for="r in regions" :key="r.name" class="region-item">
        <span class="region-name">{{ r.name }}</span>
        <div class="region-bar-wrap">
          <div class="region-bar" :style="{ '--pct': r.pct + '%' }"></div>
        </div>
        <span class="region-pct">{{ r.pct }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const regions = [
  { name: 'North America', pct: 96 },
  { name: 'Europe', pct: 92 },
  { name: 'Asia Pacific', pct: 89 },
  { name: 'Middle East', pct: 91 },
  { name: 'Africa', pct: 84 },
]
</script>

<style scoped>
.panel-section {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px;
  box-shadow: var(--card-shadow);
}
.panel-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.panel-title i { color: var(--teal); }

.region-list { display: flex; flex-direction: column; gap: 10px; }
.region-item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 8px;
}
.region-name { font-size: 0.78rem; color: var(--text); white-space: nowrap; }
.region-bar-wrap {
  width: 80px; height: 6px;
  background: var(--bg-3);
  border-radius: 999px;
  overflow: hidden;
}
.region-bar {
  height: 100%;
  width: var(--pct);
  background: linear-gradient(90deg, var(--teal), var(--blue));
  border-radius: 999px;
  transition: width 1s ease;
}
.region-pct {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--teal);
  width: 32px;
  text-align: right;
}
</style>
