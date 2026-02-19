# PROMPTS LOG

## 2026-02-19 23:08 UTC — Step 1
### User Prompt
> [Thu 2026-02-19 23:08 UTC] SYSTEM / GOVERNOR – OpenClaw Brain Build ...

(Kernaussagen gespeichert)
- Rolle: Builder/Maintainer für `openclaw-brain`
- Strikt Schritt-für-Schritt
- Nach jedem Step: genau 1 Commit (`step-X: <titel>`)
- README als Taskboard laufend pflegen
- `docs/PLAN.md` + `docs/PROMPTS.md` laufend pflegen
- Frontend: React + TypeScript (Vite) in `apps/web`
- Struktur: `components/`, `pages/`, `store/`, `services/`, `types/`
- Frontend zuerst mit Mock-Daten
- Realtime via Event-Protokoll + `MockEventBus`
- Kleine Steps (10–20 Dateien)
- Stop-Regel nach jedem Step

### Interne Sub-Prompts / Arbeitsnotizen
- Step 1 klein halten: Repo + minimale lauffähige App-Struktur + Doku.
- Keine echten API-Abhängigkeiten oder Backend-Calls.
- Vite-kompatible Dateien manuell anlegen, um File-Anzahl kontrollierbar zu halten.

## 2026-02-19 23:16 UTC — Step 0
### User Prompt
> [Thu 2026-02-19 23:16 UTC] Step 0: - Erstelle/initialisiere Git Repo "openclaw-brain" und push zu GitHub. ...

(Kernaussagen gespeichert)
- Step 0 formalisieren: Repo init + Push zu GitHub
- Dateien sicherstellen: `README.md`, `docs/PLAN.md`, `docs/PROMPTS.md`, `.gitignore`
- React+TS (Vite) unter `apps/web` mit minimalem Startscreen
- README Taskboard: Done = Step 0, Next = Step 1-3
- Commit Message exakt: `step-0: repo init + vite react skeleton`
- Danach stoppen

### Interne Sub-Prompts / Arbeitsnotizen
- Bestehenden Stand auf Step-0-Format normalisieren statt doppelt neu aufzusetzen.
- Dokumente auf konsistente Step-Nummerierung umstellen.

## 2026-02-19 23:24 UTC — Step 1
### User Prompt
> [Thu 2026-02-19 23:24 UTC] ... Step 1: Erstelle ein React+TypeScript Projekt mit Vite unter apps/web ...

(Kernaussagen gespeichert)
- Falls bereits umgesetzt: bestehende Teile skippen
- Dashboard-Skeleton mit Left Sidebar, Topbar, Main Chat Placeholder, Right Panel (Logs/Tasks Placeholder)
- Routing: `/dashboard` (default), `/agents` (placeholder)
- Kein Backend, nur Mock-Daten
- Typen: `Instance`, `Agent`, `Message`, `Task`, `LogLine`, `Event`
- `services/mock/` mit Fake-Daten
- README Start-Commands korrekt halten
- Nach Step 1 stoppen

### Interne Sub-Prompts / Arbeitsnotizen
- Vorhandenes Vite-Setup beibehalten und nur fehlende Anforderungen ergänzen.
- Step klein halten, klare Dateien, keine Backend-Integration.

## 2026-02-19 23:26 UTC — UI Feedback
### User Prompt
> [Thu 2026-02-19 23:26 UTC] ehm sieht ser hässlich aus als wenn css nicht läd und kein button funktioniert und so

(Kernaussagen gespeichert)
- Optik wirkt unstyled
- Interaktive Elemente sollen sichtbar funktionieren

### Interne Sub-Prompts / Arbeitsnotizen
- Globales CSS hinzufügen und Layout visuell klar machen.
- Minimal interaktive Elemente ergänzen (Tabs, Navigation, Input/Button), ohne Backend einzuführen.

## 2026-02-19 23:29 UTC — Step 1 (Redo)
### User Prompt
> [Thu 2026-02-19 23:29 UTC] ... Baue ein Dashboard-Skeleton ... Verwende ein simples UI Kit ...

(Kernaussagen gespeichert)
- Step 1 neu aufsetzen, vorhandenes ggf. skippen
- Layout fix: Sidebar / Topbar / Main Chat / Right Panel Tabs
- Routing: `/` lädt Dashboard
- UI Kit verwenden (Mantine oder shadcn/ui)
- Design-Basis (spacing, typography, optional dark mode)
- Types: `Instance`, `Agent`, `Message`, `Task`, `LogLine`
- `services/mock` als Fake-Datenlieferant
- Output inkl. README Start-Commands

### Interne Sub-Prompts / Arbeitsnotizen
- Mantine gewählt für schnelle, saubere Basis (Provider + Theme + Tabs/AppShell).
- Bestehendes Mock-Modell wiederverwenden, aber API als getter kapseln.

## 2026-02-19 23:31 UTC — Step 2
### User Prompt
> [Thu 2026-02-19 23:31 UTC] Step 2: Implementiere die Instances Sidebar vollständig (Mock)...

(Kernaussagen gespeichert)
- Vollständige Instances Sidebar
- Status-Badge: `idle/running/paused`
- `+ New Instance` Button + Modal + Instance wird aktiv
- Instance Selection mit Active Highlight
- Rename inline oder Modal (inline umgesetzt)
- Struktur unter `components/instances/*`
- Zustand mit Zustand Store
- Alles Mock, keine API

### Interne Sub-Prompts / Arbeitsnotizen
- Sidebar in eigene Komponenten extrahieren.
- Zustand als Single Source für instances + active selection.
- Minimal, aber vollständig klickbares UI liefern.

## 2026-02-19 23:34 UTC — Step 3
### User Prompt
> [Thu 2026-02-19 23:34 UTC] Step 3: Baue das Chat UI fertig (noch Mock)...

(Kernaussagen gespeichert)
- Message list mit Rollen: user/assistant/system/tool
- Composer unten: textarea + send button
- Enter send, Shift+Enter newline
- Beim Send: user message einfügen + assistant token-stream simulieren
- Auto-scroll, aber bei manuellem Hochscrollen nicht springen
- Konversation pro Instance getrennt
- Alles mock, aber realistisch

### Interne Sub-Prompts / Arbeitsnotizen
- Chat in eigene Komponente extrahieren (`components/chat`).
- Zustand-Store für Conversations pro Instance anlegen.
- Fake stream service per token chunks + kleiner delay.

## 2026-02-19 23:37 UTC — Step 4
### User Prompt
> [Thu 2026-02-19 23:37 UTC] Step 4: Implementiere rechts Tabs “Logs” und “Tasks”...

(Kernaussagen gespeichert)
- Logs: Live feed (1 line/sec) pro Instance
- Filter level info/warn/error
- Pause/Resume + Clear
- Tasks: name/type/status/started/updated
- Button "Start Autonomy Loop" erzeugt running task + log events
- Monitoring soll realistisch wirken (mock)

### Interne Sub-Prompts / Arbeitsnotizen
- Monitoring in getrennte Komponenten + Zustand-Store auslagern.
- Per-instance State für Logs/Tasks/Filter/Pause.
- Autonomy Loop als zeitgesteuerte Mock-Sequenz mit Task-Status-Update.

## 2026-02-19 23:40 UTC — Step 5
### User Prompt
> [Thu 2026-02-19 23:40 UTC] Step 5: Baue Agent Manager UI (noch Mock, aber CRUD im Frontend)...

(Kernaussagen gespeichert)
- Neue Route `/agents`
- Liste: name, model policy, tools policy badge, updated time
- Add/Edit Modal: name + system prompt editor + model policy dropdown
- Delete confirmation
- System prompt editor multiline + version label (UI)
- Vollständiges UI, Daten aus mock store

### Interne Sub-Prompts / Arbeitsnotizen
- Agent-Domain in Typen + Mock-Store standardisieren.
- CRUD komplett in Zustand-Store, keine API-Aufrufe.
- Mantine Table + Modal-Flow für schnelle Reviewbarkeit.

## 2026-02-19 23:44 UTC — Step 6
### User Prompt
> [Thu 2026-02-19 23:44 UTC] Prompt 6 – Services Layer abstrahieren ...

(Kernaussagen gespeichert)
- Service Layer mit Interfaces/Wrappern
- `services/apiClient.ts` placeholder
- Domain Services: `instances/chat/agents/monitoring`
- UI soll nur Services konsumieren, keine direkten Mock-Imports
- Ziel: später Backend swap ohne UI-Refactor

### Interne Sub-Prompts / Arbeitsnotizen
- Mock-Datenquelle nur hinter Service-Modulen belassen.
- Stores auf Service-Funktionen umstellen, Signaturen backend-tauglich halten.

## 2026-02-19 23:44 UTC — Step 7
### User Prompt
> [Thu 2026-02-19 23:44 UTC] Prompt 7 – WS Event Protocol (nur Frontend)...

(Kernaussagen gespeichert)
- Event-Protokoll für `chat.delta/chat.done/log.line/task.update/agent.update/instance.update`
- `MockWebSocket` als Event-Emitter bauen
- Realtime-Architektur im Frontend etablieren

### Interne Sub-Prompts / Arbeitsnotizen
- Typed Events in `types/events.ts` modellieren.
- MockWebSocket mit subscribe/emit + Simulationshelfern anlegen.
- Chat-Streaming und Monitoring-Feed auf Event-Pfad umstellen.

## 2026-02-19 23:51 UTC — Backend Step 1
### User Prompt
> [Thu 2026-02-19 23:51 UTC] Step 1 (Backend): Lege apps/api als Node+TypeScript Fastify Server an...

(Kernaussagen gespeichert)
- `apps/api` Fastify + TypeScript skeleton
- Endpoint `GET /api/health` => `{ ok, ts, version }`
- `.env` Konfig mit `PORT`, `NODE_ENV`
- Struktur: `src/index.ts`, `src/server.ts`, `src/routes/health.ts`
- `packages/shared` anlegen (shared types/schemas, zod optional)
- Dockerfile + docker compose api service
- README auf Backend Step 1 done + Next Step 2 WS/Auth
- `docs/PLAN.md` und `docs/PROMPTS.md` aktualisieren
- Commit-Message exakt: `step-1: api skeleton + health endpoint`

### Interne Sub-Prompts / Arbeitsnotizen
- Backend als separaten Step-Zweig (Backend Step 1) dokumentieren.
- API lauffähig lokal und in Docker vorbereiten.
- Shared package minimal halten, später echte monorepo wiring ergänzen.
