# OpenClaw Brain

**A control dashboard for AI agents: manage instances and agents, chat with them and watch logs and tasks in real time.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Fastify](https://img.shields.io/badge/Fastify-000000?logo=fastify&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

---

## What it does

- **Instances:** create agent instances and switch between them in a sidebar
- **Agent manager:** create, edit and delete agents
- **Chat:** talk to an agent, with answers streamed token by token
- **Monitoring:** live log stream and task list with status updates
- **Realtime layer:** a typed event bus (`chat.delta`, `log.line`, `task.update` …). Right now a mock WebSocket feeds it, and later the real backend will plug into the same interface without changes to the UI.

## Architecture

```
apps/
  web/        React + TypeScript + Vite frontend
              ├─ components/   chat, agents, instances, monitoring
              ├─ services/     API client + mock WebSocket (realtime events)
              └─ store/        state management with Zustand
  api/        Fastify + TypeScript backend (health endpoint, Dockerfile)
packages/
  shared/     shared types and schemas for web and api
docker-compose.yml
```

The frontend was built **frontend-first**: all flows run against a mock event stream, so the UI could be finished and tested before the backend exists.

## Getting started

**Web app**
```bash
cd apps/web
npm install
npm run dev        # http://localhost:5173
```

**API**
```bash
cd apps/api
cp .env.example .env
npm install
npm run dev        # http://localhost:8080/api/health
```

**API with Docker**
```bash
docker compose up --build api
```

## Roadmap

- [x] Frontend: dashboard, chat, monitoring, agent manager, service layer, mock realtime
- [x] Backend: Fastify skeleton, `GET /api/health`, Dockerfile, shared package
- [ ] WebSocket gateway + authentication
- [ ] Event bridge between API and web (replace the mock stream)
- [ ] Persistence (database)
- [ ] Tests, linting, CI

---

Built by [Tarek](https://github.com/TarekIbr)
