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
  resolved: boolean
  note?: string
}

const exceptions = ref<Exception[]>([
  { id: 'FF-2026-00412', origin: 'Chicago, IL', dest: 'Houston, TX', type: 'Weather Delay', since: 'Apr 18', priority: 'high', resolved: false },
  { id: 'FF-2026-00387', origin: 'Los Angeles, CA', dest: 'Seattle, WA', type: 'Address Issue', since: 'Apr 17', priority: 'medium', resolved: false },
  { id: 'FF-2026-00351', origin: 'New York, NY', dest: 'Miami, FL', type: 'Customs Hold', since: 'Apr 15', priority: 'high', resolved: false },
  { id: 'FF-2026-00329', origin: 'Dallas, TX', dest: 'Phoenix, AZ', type: 'Damaged Package', since: 'Apr 14', priority: 'low', resolved: false },
  { id: 'FF-2026-00311', origin: 'Denver, CO', dest: 'Boston, MA', type: 'Vehicle Breakdown', since: 'Apr 13', priority: 'medium', resolved: false },
  { id: 'FF-2026-00278', origin: 'Atlanta, GA', dest: 'Charlotte, NC', type: 'Missing Label', since: 'Apr 12', priority: 'low', resolved: true, note: 'Label reprinted and reattached at hub.' },
  { id: 'FF-2026-00255', origin: 'San Francisco, CA', dest: 'Portland, OR', type: 'Weather Delay', since: 'Apr 11', priority: 'medium', resolved: true, note: 'Rerouted via I-5 corridor.' },
])

const chipColors: Record<string, string> = {
  high: 'error',
  medium: 'warning',
  low: 'success',
}

const filterTab = ref('open')

const filteredExceptions = ref<Exception[]>([])

import { computed } from 'vue'

const displayedExceptions = computed(() =>
  exceptions.value.filter(e => filterTab.value === 'open' ? !e.resolved : e.resolved)
)

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
    resolveTarget.value.resolved = true
    resolveTarget.value.note = resolveNote.value || 'Resolved without note.'
  }
  resolveDialog.value = false
  resolveTarget.value = null
  resolveNote.value = ''
}
</script>

<template>
  <v-container fluid class="pa-6">
    <div class="d-flex align-center ga-3 mb-4">
      <v-icon color="warning" size="28">mdi-alert-circle-outline</v-icon>
      <div>
        <div class="font-weight-bold" style="font-size: 1.5rem; letter-spacing: -0.01em;">Exceptions</div>
        <div class="text-body-2 text-medium-emphasis">All open and resolved shipment exceptions</div>
      </div>
    </div>

    <v-tabs v-model="filterTab" color="primary" class="mb-4">
      <v-tab value="open">Open ({{ exceptions.filter(e => !e.resolved).length }})</v-tab>
      <v-tab value="resolved">Resolved ({{ exceptions.filter(e => e.resolved).length }})</v-tab>
    </v-tabs>

    <DashboardCard>
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
              <th v-if="filterTab === 'resolved'">Resolution Note</th>
              <th v-else>Action</th>
            </tr>
          </thead>
          <TransitionGroup name="row" tag="tbody">
            <tr v-for="exc in displayedExceptions" :key="exc.id">
              <td class="font-weight-bold text-primary" style="font-family: monospace;">{{ exc.id }}</td>
              <td>{{ exc.origin }}</td>
              <td>{{ exc.dest }}</td>
              <td>{{ exc.type }}</td>
              <td>{{ exc.since }}</td>
              <td>
                <StatusChip :color="chipColors[exc.priority]">{{ exc.priority.toUpperCase() }}</StatusChip>
              </td>
              <td v-if="filterTab === 'resolved'" class="text-caption text-medium-emphasis" style="max-width: 200px;">
                {{ exc.note }}
              </td>
              <td v-else>
                <ActionBtn prepend-icon="mdi-pencil" @click="openResolve(exc)">Resolve</ActionBtn>
              </td>
            </tr>
          </TransitionGroup>
        </v-table>
        </div>
      </template>
    </DashboardCard>

    <!-- Resolve Dialog -->
    <v-dialog v-model="resolveDialog" max-width="480" persistent>
      <v-card class="glass-card">
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
  </v-container>
</template>

<style scoped>
.row-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.row-leave-to { opacity: 0; transform: translateX(20px); }
</style>
