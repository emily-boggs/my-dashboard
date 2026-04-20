<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import StatsGrid from '@/components/StatsGrid.vue'
import MapSection from '@/components/MapSection.vue'
import DeliveryRates from '@/components/DeliveryRates.vue'
import RegionalPerformance from '@/components/RegionalPerformance.vue'
import ExceptionsTable from '@/components/ExceptionsTable.vue'
import ShipmentChart from '@/components/ShipmentChart.vue'
</script>

<template>
  <TopBar />

  <StatsGrid />

  <section class="map-section">
    <MapSection />
    <div class="side-panel">
      <DeliveryRates />
      <RegionalPerformance />
    </div>
  </section>

  <div class="content-pad">
    <ExceptionsTable />
  </div>

  <div class="content-pad">
    <ShipmentChart />
  </div>

  <footer class="footer">
    Made with <i class="fa-solid fa-heart" style="color: var(--teal)"></i> Todd's Video Instructions and Copilot
  </footer>
</template>

<style scoped>
.map-section {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 16px;
  padding: 16px 28px 0;
}
.side-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.content-pad {
  padding: 16px 28px 0;
}
.footer {
  margin: 20px 28px 16px;
  padding: 12px 0;
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

@media (max-width: 1100px) {
  .map-section { grid-template-columns: 1fr; }
  .side-panel { flex-direction: row; }
  .side-panel > * { flex: 1; }
}
@media (max-width: 768px) {
  .map-section { padding: 16px; }
  .content-pad { padding: 16px; }
}
@media (max-width: 480px) {
  .side-panel { flex-direction: column; }
}
</style>
