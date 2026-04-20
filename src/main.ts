import './assets/global.css'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#0e1117',
          surface: '#161b25',
          'surface-variant': '#1e2635',
          primary: '#2dd4bf',
          secondary: '#38bdf8',
          success: '#4ade80',
          warning: '#fb923c',
          error: '#f87171',
          info: '#38bdf8',
          'on-background': '#e8eaf0',
          'on-surface': '#e8eaf0',
        },
      },
      light: {
        dark: false,
        colors: {
          background: '#f0f4f8',
          surface: '#ffffff',
          'surface-variant': '#e8edf4',
          primary: '#0d9488',
          secondary: '#0284c7',
          success: '#16a34a',
          warning: '#ea580c',
          error: '#dc2626',
          info: '#0284c7',
          'on-background': '#0d1117',
          'on-surface': '#0d1117',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
