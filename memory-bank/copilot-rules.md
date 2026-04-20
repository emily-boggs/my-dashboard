## Never Upload Secrets

- Do not store API keys or `.env` in repo.
- Use `.env.example` with placeholders.
- If a secret is leaked: rotate credentials, purge history, notify team.

## Code Style

- Use `<script setup lang="ts">` for all Vue components
- Use Composition API (`ref`, `computed`, `onMounted`) — no Options API
- Use Vuetify components instead of raw HTML where possible
- Use the reusable wrappers (`DashboardCard`, `ActionBtn`, `StatusChip`) for consistency
- Cards always use `variant="outlined"`; buttons default to `variant="outlined"`
- Reference Vuetify theme colors via CSS vars: `rgb(var(--v-theme-primary))`, not custom vars
- Icons use MDI names (`mdi-truck`, `mdi-alert`, etc.) — no Font Awesome

## Component Conventions

- One component per file in `src/components/`
- Page-level views in `src/views/`
- Props use `defineProps<{}>()` with TypeScript interfaces
- Defaults via `withDefaults()` when needed
- Emit events via `defineEmits`

## What NOT to Do

- Don't add Pinia unless cross-component state is truly needed
- Don't add a charting library — SVG charts are intentional
- Don't add ESLint/Prettier without explicit request
- Don't use `data-theme` attribute — Vuetify handles theming
