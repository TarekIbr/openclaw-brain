# PLAN

## Ziele
- OpenClaw Brain als React + TypeScript Web-App aufbauen.
- Frontend-first mit Mock-Daten und Realtime-Event-Protokoll starten.
- Architektur so vorbereiten, dass später ein echtes Backend eingesteckt werden kann.

## Architektur (aktueller Stand)
- Monorepo-light Struktur mit `apps/web`.
- Vite-kompatible TS-React App (manuell aufgebaut).
- Geplante Layer:
  - `types/`: Event- und Domain-Typen
  - `services/`: `MockEventBus`, später echte Transportadapter
  - `store/`: zentraler State für UI + Events
  - `components/` und `pages/`: UI

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
- Step 1: Dashboard-Skeleton mit 3-Panel-Layout + Platzhaltern gebaut.
- Step 1: Routing ergänzt (`/dashboard` als Default, `/agents` Placeholder).
- Step 1: Typmodell und Mock-Daten-Service unter `services/mock` erstellt.

## Next
- Step 2: Event-Protokoll + MockEventBus implementieren.
- Step 3: Store-Layer für Events/State ergänzen.
- Step 4: UI-Interaktionen und tabbed Right Panel ausbauen.

## Blockers
- Keine.
