# openclaw-brain

OpenClaw Brain – frontend-first React + TypeScript app with mock realtime events.

## ✅ Done
- **Step 0**: Git-Repo `openclaw-brain` initialisiert und zu GitHub gepusht.
- **Step 0**: `README.md`, `docs/PLAN.md`, `docs/PROMPTS.md`, `.gitignore` angelegt.
- **Step 0**: React + TypeScript (Vite) unter `apps/web` mit minimalem Startscreen aufgesetzt.
- **Step 1**: Dashboard-Skeleton mit Routing (`/dashboard`, `/agents`) und Mock-Datenstruktur umgesetzt.
- **Step 1**: Typen angelegt (`Instance`, `Agent`, `Message`, `Task`, `LogLine`, `Event`) + `services/mock` Fake-Daten.

## 🚧 In Progress
- **Step 2**: Event-Protokoll und `MockEventBus` aufsetzen.

## 🧭 Next
1. Step 2: Event protocol + `MockEventBus` service implementieren.
2. Step 3: Store + Domain-Typen für Sessions/Events verdrahten.
3. Step 4: Right Panel Tabs (Logs/Tasks) als echte tabbed UI + Interaktion.

## 🗺️ Roadmap
- Phase A: Foundation (repo, docs, frontend shell)
- Phase B: Realtime Mock Core (event protocol, bus, store)
- Phase C: Product Flows (pages/components with mock data)
- Phase D: Backend Plug-In Layer (replace mock bus with real transport)
- Phase E: Quality (tests, linting, CI)

## 🧪 How to run
```bash
cd apps/web
npm install
npm run dev
```

Open in browser:
- `http://localhost:5173/dashboard`
- `http://localhost:5173/agents`

## Release Notes
- Step 1 delivered dashboard shell layout, routing, and mock domain data.
- UI polish: global CSS wired, tabs are clickable, navigation links work, mock chat input/send interaction added.
