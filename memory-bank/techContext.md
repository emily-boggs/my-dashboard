# Tech Context

## Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) | 3.5.32 |
| Language | TypeScript | ~6.0 |
| Build Tool | Vite | 8.0.8 |
| Router | Vue Router | 5.0.4 |
| UI Library | Vuetify 3 | 4.0.5 |
| Icons | Material Design Icons (`@mdi/font`) | 7.4.x |
| Font | Google Fonts — Open Sans (400/500/600/700) | CDN |

## Dev Environment

- **Package manager:** npm
- **Dev server:** `npm run dev` → Vite on `localhost:5173`
- **Build:** `npm run build` (runs `vue-tsc --build` + `vite build`)
- **Preview:** `npm run preview`
- **Deployment target:** Vercel (static site)

## Vuetify Configuration (`src/main.ts`)

- Full component + directive imports (`vuetify/components`, `vuetify/directives`)
- Two custom themes: **dark** (default) and **light**
  - Dark: background `#0e1117`, primary `#2dd4bf` (teal), secondary `#38bdf8` (blue)
  - Light: background `#f0f4f8`, primary `#0284c7` (blue), secondary `#0d9488` (teal)
- Icon set: `mdi` (Material Design Icons)
- Theme toggle via `useTheme()` composable in TopBar

## Key Files

| File | Purpose |
|---|---|
| `src/main.ts` | App entry — Vue + Vuetify plugin setup, theme config |
| `src/App.vue` | Root shell — `v-app`, SideBar, TopBar, `v-main` > RouterView |
| `src/router/index.ts` | Single route: `/` → DashboardView |
| `src/assets/global.css` | Minimal global styles — Open Sans, animated background glow |
| `index.html` | HTML entry — Google Fonts CDN, no other CDNs |

## Constraints

- Mock/static data only (no API or database)
- No authentication
- No state management library (no Pinia) — component-local state only
- No ESLint or Prettier configured
- No testing framework configured