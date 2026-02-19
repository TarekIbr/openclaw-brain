# openclaw-brain

OpenClaw Brain – frontend-first React + TypeScript app with mock realtime events.

## ✅ Done
- **Step 0**: Git-Repo `openclaw-brain` initialisiert und zu GitHub gepusht.
- **Step 0**: `README.md`, `docs/PLAN.md`, `docs/PROMPTS.md`, `.gitignore` angelegt.
- **Step 0**: React + TypeScript (Vite) unter `apps/web` mit minimalem Startscreen aufgesetzt.
- **Step 1**: Dashboard-Skeleton mit Mantine UI Kit umgesetzt (Sidebar Instances, Topbar Status, Chat Main, Logs/Tasks Tabs rechts).
- **Step 1**: Routing auf `/` als Dashboard-Default umgestellt.
- **Step 1**: Typen angelegt (`Instance`, `Agent`, `Message`, `Task`, `LogLine`) + `services/mock` Fake-Daten-Service.
- **Step 2**: Instances Sidebar vollständig mit Zustand-Store umgesetzt (select active, rename inline, create via modal, active highlight).
- **Step 3**: Chat UI mock-realistisch umgesetzt (rollenbasierte Bubbles, Composer mit Enter/Shift+Enter, Fake-Streaming, Auto-Scroll mit User-Scroll-Respekt, Konversation pro Instance).

## 🚧 In Progress
- **Step 4**: Event-Protokoll und `MockEventBus` aufsetzen.

## 🧭 Next
1. Step 4: Event protocol + `MockEventBus` service implementieren.
2. Step 5: Event-Stream an Logs/Tasks anbinden.
3. Step 6: UI Controls für Mock-Realtime-Szenarien ergänzen.

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
- `http://localhost:5173/`

## Release Notes
- Step 1 rebuilt with Mantine and a cleaner dashboard skeleton + dark theme baseline.
- Step 2 adds a full mock Instances Sidebar with Zustand-powered create/select/rename flows.
- Step 3 upgrades chat UX with per-instance conversations and fake assistant token streaming.
