# openclaw-brain

OpenClaw Brain – frontend-first React + TypeScript app with mock realtime events.

## ✅ Done
- **Frontend Step 0–7**: Dashboard, Chat, Monitoring, Agent Manager, Service Layer und MockWebSocket-Realtime stehen.
- **Backend Step 1**: `apps/api` Fastify + TypeScript Skeleton angelegt.
- **Backend Step 1**: `GET /api/health` liefert `{ ok: true, ts, version }`.
- **Backend Step 1**: `.env`-Konfiguration vorbereitet (`PORT`, `NODE_ENV`, `VERSION`).
- **Backend Step 1**: `packages/shared` Basisstruktur angelegt (shared types/schemas).
- **Backend Step 1**: Dockerfile für API + `docker-compose.yml` Service ergänzt.

## 🚧 In Progress
- **Backend Step 2**: WS + Auth.

## 🧭 Next
1. Backend Step 2: WebSocket Gateway + Auth-Basis.
2. Backend Step 3: Event-Bridge API ↔ Web.
3. Backend Step 4: Persistenz (erste DB-Schnittstellen).

## 🗺️ Roadmap
- Phase A: Foundation (repo, docs, frontend shell)
- Phase B: Realtime Mock Core (event protocol, bus, store)
- Phase C: Product Flows (pages/components with mock data)
- Phase D: Backend Plug-In Layer (replace mock bus with real transport)
- Phase E: Quality (tests, linting, CI)

## 🧪 How to run
Web app:
```bash
cd apps/web
npm install
npm run dev
```

API:
```bash
cd apps/api
cp .env.example .env
npm install
npm run dev
```

Docker (API only):
```bash
docker compose up --build api
```

Open in browser:
- Web: `http://localhost:5173/`
- API health: `http://localhost:8080/api/health`

## Release Notes
- Step 1 rebuilt with Mantine and a cleaner dashboard skeleton + dark theme baseline.
- Step 2 adds a full mock Instances Sidebar with Zustand-powered create/select/rename flows.
- Step 3 upgrades chat UX with per-instance conversations and fake assistant token streaming.
- Step 4 adds realistic monitoring behavior: live logs, controls, and autonomy-loop task simulation.
- Step 5 adds Agent Manager page with complete frontend CRUD on mock store data.
- Step 6 adds stable service interfaces so backend transport can be swapped later without UI refactor.
- Step 7 introduces a typed realtime event protocol and a MockWebSocket emitter architecture.
- Backend Step 1 introduces Fastify API skeleton with health endpoint and Docker compose service.
