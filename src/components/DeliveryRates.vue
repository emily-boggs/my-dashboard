<template>
  <div class="panel-section">
    <h3 class="panel-title"><i class="fa-solid fa-chart-pie"></i> Delivery Rates</h3>
    <div class="donut-chart-wrap">
      <svg class="donut-chart" viewBox="0 0 120 120">
        <circle class="donut-bg" cx="60" cy="60" r="50" />
        <circle class="donut-segment teal" cx="60" cy="60" r="50"
          stroke-dasharray="295.31 314.16" stroke-dashoffset="0" />
        <circle class="donut-segment green" cx="60" cy="60" r="50"
          stroke-dasharray="12.57 314.16" stroke-dashoffset="-295.31" />
        <circle class="donut-segment orange" cx="60" cy="60" r="50"
          stroke-dasharray="6.28 314.16" stroke-dashoffset="-307.88" />
        <text x="60" y="56" class="donut-center-val">94%</text>
        <text x="60" y="70" class="donut-center-label">On-Time</text>
      </svg>
      <div class="donut-legend">
        <div><span class="legend-dot teal"></span> On-Time: 94%</div>
        <div><span class="legend-dot green"></span> Early: 4%</div>
        <div><span class="legend-dot orange"></span> Late: 2%</div>
      </div>
    </div>
  </div>
</template>

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

.donut-chart-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
}
.donut-chart { width: 100px; height: 100px; flex-shrink: 0; }
.donut-bg { fill: none; stroke: var(--bg-3); stroke-width: 12; }
.donut-segment {
  fill: none;
  stroke-width: 12;
  transform: rotate(-90deg);
  transform-origin: 60px 60px;
  transition: stroke-dasharray 1s ease;
}
.donut-segment.teal   { stroke: var(--teal); }
.donut-segment.green  { stroke: var(--green); }
.donut-segment.orange { stroke: var(--orange); }

.donut-center-val {
  font-size: 18px; font-weight: 700; fill: var(--text);
  text-anchor: middle; font-family: var(--font);
}
.donut-center-label {
  font-size: 8px; fill: var(--text-muted);
  text-anchor: middle; font-family: var(--font);
}

.donut-legend {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.75rem;
  color: var(--text-muted);
}
</style>
