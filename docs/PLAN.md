# PLAN

## Ziele
- OpenClaw Brain als React + TypeScript Web-App aufbauen.
- Frontend-first mit Mock-Daten und Realtime-Event-Protokoll starten.
- Architektur so vorbereiten, dass später ein echtes Backend eingesteckt werden kann.

## Architektur (aktueller Stand)
- Monorepo-light Struktur mit `apps/web`, `apps/api`, `packages/shared`.
- Frontend: Vite + React + TypeScript.
- Backend: Fastify + TypeScript (Skeleton).
- Layer:
  - `apps/web/src/types|services|store|components|pages`
  - `apps/api/src/routes` + server bootstrap
  - `packages/shared` für wiederverwendbare Types/Schemas

## Entscheidungen
- Kleine, reviewbare Steps statt großer Initial-Scaffold-Explosion.
- Frontend ohne echte API-Calls, nur Mocks.
- Dokumentation von Beginn an als Taskboard + Plan geführt.

## Offene Fragen
- Soll der State mit Redux Toolkit, Zustand oder reinem React Context umgesetzt werden?
- Welche primären User-Flows zuerst (Dashboard, Session Timeline, Prompt Log)?
- Welche Event-Schemata müssen stabil sein für späteres Backend?

## Done
- Step 0: Repo initialisiert, GitHub-Remote erstellt, `main` gepusht.
- Step 0: Basis-Doku (`README`, `PLAN`, `PROMPTS`) und `.gitignore` angelegt.
- Step 0: Vite React+TS Skeleton unter `apps/web` erstellt.
- Step 1: Dashboard-Skeleton mit Mantine UI Kit neu aufgebaut.
- Step 1: Layout umgesetzt: Sidebar (Instances), Topbar (Active + Status), Main (Chat), Right Panel (Logs/Tasks Tabs).
- Step 1: Routing auf `/` als Dashboard-Default gesetzt.
- Step 1: Typen + `services/mock` Datenlieferer erstellt.
- Step 2: Instances Sidebar vollständig per Mock umgesetzt (Zustand Store, Active Selection, Rename, Create via Modal).
- Step 3: Chat UI mit Mock-Realtime fertiggestellt (Author-Bubbles, Composer, Enter/Shift+Enter, tokenweises Assistant-Streaming, per-instance conversations, basic smart autoscroll).
- Step 4: Monitoring-Tabs mit Live-Simulation umgesetzt (Logs 1/s pro Instance inkl. Filter/Pause/Clear; Tasks inkl. Start Autonomy Loop + Log-Emissionen).
- Step 5: Agent Manager UI als eigene Seite (`/agents`) mit Mock-CRUD (Add/Edit/Delete), Model/Tools Policies und System-Prompt Editor umgesetzt.
- Step 6: Service-Abstraktionsschicht eingeführt (`apiClient`, domain services) und direkte Mock-Imports aus UI/Stores entfernt.
- Step 7: Event-Protokoll (`chat.delta/chat.done/log.line/task.update/agent.update/instance.update`) + MockWebSocket implementiert und in Chat/Monitoring verdrahtet.
- Backend Step 1: `apps/api` Fastify-Server, Health-Route, ENV-Config, Dockerfile + Compose-Service und `packages/shared` Basisstruktur angelegt.

## Next
- Backend Step 2: WebSocket + Auth-Basis implementieren.
- Backend Step 3: API↔Frontend Event-Brücke definieren.
- Backend Step 4: Persistenzschicht vorbereiten.

## Blockers
- Keine.
