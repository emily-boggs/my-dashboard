# System Patterns

## Architecture

Single-page Vue 3 app with Vuetify component library. One route (`/`) renders `DashboardView`, which composes all dashboard widgets. No backend — all data is hardcoded in components.

```
App.vue (v-app shell)
├── SideBar.vue (v-navigation-drawer)
├── TopBar.vue (v-app-bar)
└── v-main > RouterView
    └── DashboardView.vue (v-container layout)
        ├── StatsGrid.vue — 4 KPI cards
        ├── MapSection.vue — SVG world map + shipment dots
        ├── DeliveryRates.vue — Donut chart
        ├── RegionalPerformance.vue — Progress bars
        ├── ExceptionsTable.vue — Data table with actions
        └── ShipmentChart.vue — Bar chart
```

## Reusable Components

Three shared wrapper components enforce consistent styling across the dashboard:

| Component | Wraps | Default Props | Slots |
|---|---|---|---|
| `DashboardCard` | `v-card` + title/divider/card-text | `variant="outlined"`, icon + title in header | `default` (in card-text), `#actions` (title right side), `#raw` (unwrapped) |
| `ActionBtn` | `v-btn` | `variant="outlined"`, `size="x-small"` | `default` (label) |
| `StatusChip` | `v-chip` | `variant="tonal"`, `size="x-small"`, `label` | `default` (label) |

## Key Patterns

- **Composition API everywhere** — All components use `<script setup lang="ts">` with `defineProps`, `ref`, `onMounted`
- **Vuetify theme system** — Dark/light toggle via `useTheme()` composable; no manual CSS variable switching
- **Vuetify CSS variables** — Custom CSS references `rgb(var(--v-theme-primary))` etc. instead of custom CSS vars
- **SVG visualizations** — Map, donut chart, and bar chart are hand-built SVG, not a charting library
- **Animated counters** — StatsGrid uses `requestAnimationFrame` with eased progress to animate KPI numbers on mount
- **TransitionGroup** — ExceptionsTable rows animate out on resolve

## Layout Pattern

DashboardView uses Vuetify's grid system:
- `v-container fluid` with `pa-6`
- `v-row` / `v-col` with breakpoints (`cols="12" lg="8"`, `cols="12" lg="4"`, etc.)
- Side panel (DeliveryRates + RegionalPerformance) stacks in a flex column