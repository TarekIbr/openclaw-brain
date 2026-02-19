import type { LogLine, Task } from '../types/models';

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export type LevelFilter = 'all' | 'info' | 'warn' | 'error';

export function buildLogLine(level: LogLine['level'], text: string): LogLine {
  return {
    id: `log-${makeId()}`,
    level,
    text,
    createdAt: new Date().toISOString()
  };
}

export function buildAutonomyTask(name = 'Autonomy Loop'): Task {
  const now = new Date().toISOString();
  return {
    id: `task-${makeId()}`,
    name,
    type: 'loop',
    status: 'running',
    startedAt: now,
    updatedAt: now
  };
}
