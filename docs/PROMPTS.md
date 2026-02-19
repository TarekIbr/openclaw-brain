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
