<script setup lang="ts">
import { ref } from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'
import ActionBtn from '@/components/ActionBtn.vue'
import StatusChip from '@/components/StatusChip.vue'

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

const chipColors: Record<string, string> = {
  high: 'error',
  medium: 'warning',
  low: 'success',
}

function resolve(id: string) {
  exceptions.value = exceptions.value.filter(e => e.id !== id)
}
</script>

<template>
  <DashboardCard title="Open Exceptions" icon="mdi-alert" icon-color="warning">
    <template #actions>
      <ActionBtn append-icon="mdi-arrow-right">View All</ActionBtn>
    </template>
    <template #raw>
    <v-table density="comfortable" hover>
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
          <td class="font-weight-bold text-primary" style="font-family: monospace;">{{ exc.id }}</td>
          <td>{{ exc.origin }}</td>
          <td>{{ exc.dest }}</td>
          <td>{{ exc.type }}</td>
          <td>{{ exc.since }}</td>
          <td>
            <StatusChip :color="chipColors[exc.priority]">
              {{ exc.priority }}
            </StatusChip>
          </td>
          <td>
            <ActionBtn prepend-icon="mdi-pencil" @click="resolve(exc.id)">
              Resolve
            </ActionBtn>
          </td>
        </tr>
      </TransitionGroup>
    </v-table>
    </template>
  </DashboardCard>
</template>

<style scoped>
.row-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.row-leave-to { opacity: 0; transform: translateX(20px); }
</style>
