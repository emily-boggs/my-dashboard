<script setup lang="ts">
import { ref } from 'vue'

interface Exception {
  id: string
  origin: string
  dest: string
  type: string
  since: string
  priority: 'high' | 'medium' | 'low'
}

const exceptions = ref<Exception[]>([
  { id: 'FF-2026-00412', origin: 'Chicago, IL', dest: 'Houston, TX', type: 'Weather Delay', since: 'Apr 18', priority: 'high' },
  { id: 'FF-2026-00387', origin: 'Los Angeles, CA', dest: 'Seattle, WA', type: 'Address Issue', since: 'Apr 17', priority: 'medium' },
  { id: 'FF-2026-00351', origin: 'New York, NY', dest: 'Miami, FL', type: 'Customs Hold', since: 'Apr 15', priority: 'high' },
  { id: 'FF-2026-00329', origin: 'Dallas, TX', dest: 'Phoenix, AZ', type: 'Damaged Package', since: 'Apr 14', priority: 'low' },
  { id: 'FF-2026-00311', origin: 'Denver, CO', dest: 'Boston, MA', type: 'Vehicle Breakdown', since: 'Apr 13', priority: 'medium' },
])

function resolve(id: string) {
  exceptions.value = exceptions.value.filter(e => e.id !== id)
}
</script>

<template>
  <section class="exceptions-section">
    <div class="section-header">
      <h2><i class="fa-solid fa-triangle-exclamation"></i> Open Exceptions</h2>
      <button class="btn-outline small">View All <i class="fa-solid fa-arrow-right"></i></button>
    </div>
    <div class="table-wrap">
      <table class="exceptions-table">
        <thead>
          <tr>
            <th>Tracking #</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Exception Type</th>
            <th>Since</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <TransitionGroup name="row" tag="tbody">
          <tr v-for="exc in exceptions" :key="exc.id">
            <td><span class="tracking-id">{{ exc.id }}</span></td>
            <td>{{ exc.origin }}</td>
            <td>{{ exc.dest }}</td>
            <td>{{ exc.type }}</td>
            <td>{{ exc.since }}</td>
            <td><span class="badge-pill" :class="exc.priority">{{ exc.priority }}</span></td>
            <td><button class="btn-outline small" @click="resolve(exc.id)"><i class="fa-solid fa-pen"></i> Resolve</button></td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
  </section>
</template>

<style scoped>
.exceptions-section {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--card-shadow);
  overflow: hidden;
}
.section-header h2 i { color: var(--orange); }

.table-wrap { overflow-x: auto; }

.exceptions-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}
.exceptions-table th {
  text-align: left;
  padding: 10px 16px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  background: var(--bg-3);
  white-space: nowrap;
}
.exceptions-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  vertical-align: middle;
}
.exceptions-table tr:last-child td { border-bottom: none; }
.exceptions-table tbody tr { transition: background var(--transition); }
.exceptions-table tbody tr:hover { background: var(--bg-3); }

.tracking-id {
  font-family: 'Courier New', monospace;
  font-size: 0.78rem;
  color: var(--teal);
  font-weight: 600;
}

/* Row transition */
.row-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.row-leave-to { opacity: 0; transform: translateX(20px); }
</style>
