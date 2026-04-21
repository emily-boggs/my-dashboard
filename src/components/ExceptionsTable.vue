<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardCard from '@/components/DashboardCard.vue'
import ActionBtn from '@/components/ActionBtn.vue'
import StatusChip from '@/components/StatusChip.vue'

const router = useRouter()

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

// Resolve dialog
const resolveDialog = ref(false)
const resolveTarget = ref<Exception | null>(null)
const resolveNote = ref('')

function openResolve(exc: Exception) {
  resolveTarget.value = exc
  resolveNote.value = ''
  resolveDialog.value = true
}

function confirmResolve() {
  if (resolveTarget.value) {
    exceptions.value = exceptions.value.filter(e => e.id !== resolveTarget.value!.id)
  }
  resolveDialog.value = false
  resolveTarget.value = null
  resolveNote.value = ''
}
</script>

<template>
  <DashboardCard title="Open Exceptions" icon="mdi-alert" icon-color="warning">
    <template #actions>
      <ActionBtn append-icon="mdi-arrow-right" @click="router.push('/exceptions')">View All</ActionBtn>
    </template>
    <template #raw>
    <div style="overflow-x: auto;">
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
              {{ exc.priority.toUpperCase() }}
            </StatusChip>
          </td>
          <td>
            <ActionBtn prepend-icon="mdi-pencil" @click="openResolve(exc)">
              Resolve
            </ActionBtn>
          </td>
        </tr>
      </TransitionGroup>
    </v-table>
    </div>
    </template>
  </DashboardCard>

  <!-- Resolve Dialog -->
  <v-dialog v-model="resolveDialog" max-width="480" persistent>
    <v-card class="glass-card resolve-card">
      <v-card-title class="d-flex align-center ga-2 pt-4">
        <v-icon color="primary">mdi-check-circle</v-icon>
        Resolve Exception
      </v-card-title>
      <v-card-text>
        <div v-if="resolveTarget" class="text-caption text-medium-emphasis mb-3">
          Resolving <strong class="text-primary">{{ resolveTarget.id }}</strong>
          — {{ resolveTarget.type }} ({{ resolveTarget.origin }} → {{ resolveTarget.dest }})
        </div>
        <v-textarea
          v-model="resolveNote"
          label="Resolution note"
          placeholder="Describe how this exception was resolved..."
          rows="3"
          variant="outlined"
          density="comfortable"
          auto-grow
        />
      </v-card-text>
      <v-card-actions class="px-4 pb-4">
        <v-spacer />
        <v-btn variant="text" @click="resolveDialog = false">Cancel</v-btn>
        <v-btn color="primary" variant="flat" prepend-icon="mdi-check" @click="confirmResolve">Resolve</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.row-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.row-leave-to { opacity: 0; transform: translateX(20px); }
.resolve-card {
  background: rgba(var(--v-theme-surface), 0.92) !important;
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
}
</style>
