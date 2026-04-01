# Map Pinboard

An interactive map application that lets you drop and manage named pins anywhere on the world map. Pins are reverse-geocoded automatically and persisted across sessions via `localStorage`.

[Live Demo](https://map-pin-board.vercel.app/)

---

## Features

- **Click-to-pin** — click anywhere on the map to drop a pin; the location name is resolved automatically via the [Nominatim](https://nominatim.openstreetmap.org/) reverse-geocoding API
- **Persistent pins** — all pins are saved to `localStorage` through Zustand's `persist` middleware and restored on the next visit
- **Geolocation** — the map centres on your current position on first load
- **Pin list sidebar** — desktop view shows a fixed sidebar listing all pins with coordinates; hovering a row flies the map to that pin
- **Bottom sheet** — mobile/portrait view shows a draggable bottom sheet with snapping behaviour (default / half / full-screen)
- **Delete pins** — remove any pin from either the sidebar or the bottom sheet
- **Loading indicator** — shown while a reverse-geocode request is in-flight
- **Smooth animations** — marker enter/exit transitions and map fly-to powered by Motion

---

## Tech Stack

| Layer           | Library                                                                            |
| --------------- | ---------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org/) (App Router, SSR disabled for map)               |
| Language        | TypeScript 5                                                                       |
| Map             | [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/) |
| State           | [Zustand 5](https://github.com/pmndrs/zustand) with `persist` middleware           |
| Animations      | [Motion (formerly Framer Motion)](https://motion.dev/)                             |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com/)                                        |
| Icons           | [Lucide React](https://lucide.dev/)                                                |
| Package manager | [pnpm](https://pnpm.io/)                                                           |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm (`npm i -g pnpm`)

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Allow location access when prompted.

### Build for production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
app/
├── page.tsx                  # Entry point — dynamically imports Map (SSR disabled)
├── layout.tsx                # Root layout
├── globals.css               # Global styles
├── _components/
│   ├── Map.tsx               # Top-level map shell
│   ├── MapMarker.tsx         # Click handler + individual marker rendering
│   ├── Sidebar.tsx           # Desktop pin list (xl breakpoint)
│   ├── BottomSheet.tsx       # Mobile draggable bottom sheet
│   ├── Header.tsx            # App header bar
│   └── LoadingIndicator.tsx  # Shown during reverse-geocode requests
├── _hooks/
│   └── useGetUserLocation.tsx  # Wraps the Geolocation API
├── _utils/
│   └/reverseGeocode.ts       # Nominatim reverse-geocode fetch
└── stores/
    └── useLocationStore.ts   # Zustand store (locations, active pin, loading state)
```

---

## How It Works

1. On load, `useGetUserLocation` requests the browser's geolocation and centres the map.
2. `useLocationStore` rehydrates saved pins from `localStorage` via the Zustand `persist` middleware (`"map-pinboard-locations"` key).
3. Clicking the map calls `reverseGeocode` (Nominatim) to resolve a human-readable name, then dispatches `addLocation` to the store.
4. Both `Sidebar` and `BottomSheet` read `locations` directly from the store — no prop drilling.
5. Selecting a pin in the list calls `setActiveLocation`, which triggers a `flyTo` animation on the corresponding `LocationMarker`.
6. Deleting a pin calls `removeLocation`; the store update is automatically flushed to `localStorage`.
