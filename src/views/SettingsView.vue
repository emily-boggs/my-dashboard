<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const profile = ref({
  name: 'Emily Boggs',
  email: 'emily.boggs@fastforward.io',
  phone: '+1 (555) 867-5309',
})

const avatarUrl = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

function triggerUpload() {
  fileInput.value?.click()
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    avatarUrl.value = URL.createObjectURL(file)
  }
}

const notifications = ref({
  email: true,
  push: true,
  sms: false,
  weeklyDigest: true,
  exceptionAlerts: true,
  deliveryUpdates: false,
})

const defaultMode = ref(theme.global.current.value.dark ? 'dark' : 'light')

function applyMode() {
  theme.change(defaultMode.value)
}

const saved = ref(false)

function save() {
  applyMode()
  saved.value = true
  setTimeout(() => saved.value = false, 2500)
}
</script>

<template>
  <v-container fluid class="pa-6">
    <div class="d-flex align-center ga-3 mb-6">
      <v-icon color="primary" size="28">mdi-cog</v-icon>
      <div>
        <div class="text-h6 font-weight-bold">Settings</div>
        <div class="text-caption text-medium-emphasis">Application preferences and configuration</div>
      </div>
    </div>

    <v-row>
      <!-- Profile -->
      <v-col cols="12" md="6">
        <v-card variant="flat" class="glass-card pa-6">
          <div class="text-subtitle-1 font-weight-bold mb-4">Profile</div>

          <div class="d-flex align-center ga-4 mb-6">
            <v-avatar size="72" color="primary" variant="tonal" style="cursor: pointer;" @click="triggerUpload">
              <v-img v-if="avatarUrl" :src="avatarUrl" cover />
              <v-icon v-else size="32">mdi-account</v-icon>
            </v-avatar>
            <div>
              <v-btn variant="tonal" color="primary" size="small" rounded="pill" @click="triggerUpload">
                Upload Photo
              </v-btn>
              <div class="text-caption text-medium-emphasis mt-1">JPG or PNG, max 2 MB</div>
              <input ref="fileInput" type="file" accept="image/jpeg,image/png" hidden @change="onFileChange" />
            </div>
          </div>

          <v-text-field
            v-model="profile.name"
            label="Full Name"
            variant="outlined"
            density="compact"
            class="mb-3"
          />
          <v-text-field
            v-model="profile.email"
            label="Email"
            variant="outlined"
            density="compact"
            type="email"
            class="mb-3"
          />
          <v-text-field
            v-model="profile.phone"
            label="Phone"
            variant="outlined"
            density="compact"
            type="tel"
          />
        </v-card>
      </v-col>

      <!-- Notifications & Appearance -->
      <v-col cols="12" md="6">
        <v-card variant="flat" class="glass-card pa-6 mb-6">
          <div class="text-subtitle-1 font-weight-bold mb-4">Notifications</div>

          <v-switch
            v-model="notifications.email"
            label="Email notifications"
            color="primary"
            density="compact"
            hide-details
            class="mb-2"
          />
          <v-switch
            v-model="notifications.push"
            label="Push notifications"
            color="primary"
            density="compact"
            hide-details
            class="mb-2"
          />
          <v-switch
            v-model="notifications.sms"
            label="SMS notifications"
            color="primary"
            density="compact"
            hide-details
            class="mb-2"
          />
          <v-divider class="my-3" />
          <v-switch
            v-model="notifications.exceptionAlerts"
            label="Exception alerts"
            color="primary"
            density="compact"
            hide-details
            class="mb-2"
          />
          <v-switch
            v-model="notifications.deliveryUpdates"
            label="Delivery updates"
            color="primary"
            density="compact"
            hide-details
            class="mb-2"
          />
          <v-switch
            v-model="notifications.weeklyDigest"
            label="Weekly digest"
            color="primary"
            density="compact"
            hide-details
          />
        </v-card>

        <v-card variant="flat" class="glass-card pa-6">
          <div class="text-subtitle-1 font-weight-bold mb-4">Appearance</div>

          <v-radio-group v-model="defaultMode" inline hide-details>
            <v-radio label="Dark" value="dark" color="primary" />
            <v-radio label="Light" value="light" color="primary" />
          </v-radio-group>
        </v-card>
      </v-col>
    </v-row>

    <div class="d-flex align-center ga-3 mt-6">
      <v-btn color="primary" variant="flat" rounded="pill" @click="save">Save Changes</v-btn>
      <v-fade-transition>
        <span v-if="saved" class="text-caption text-success d-flex align-center ga-1">
          <v-icon size="16">mdi-check-circle</v-icon> Saved
        </span>
      </v-fade-transition>
    </div>
  </v-container>
</template>
