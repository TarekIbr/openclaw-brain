import { create } from 'zustand';
import type { LogLine, Task } from '../types/models';
import { mockWebSocket } from '../services/mockWebSocket';
import { buildAutonomyTask, buildLogLine, type LevelFilter } from '../services/monitoring';

type LogsByInstance = Record<string, LogLine[]>;
type TasksByInstance = Record<string, Task[]>;
type PauseByInstance = Record<string, boolean>;
type FilterByInstance = Record<string, LevelFilter>;

interface MonitoringStore {
  logsByInstance: LogsByInstance;
  tasksByInstance: TasksByInstance;
  pausedByInstance: PauseByInstance;
  filterByInstance: FilterByInstance;
  wsBound: boolean;
  ensureInstance: (instanceId: string) => void;
  appendLog: (instanceId: string, level: LogLine['level'], text: string) => void;
  clearLogs: (instanceId: string) => void;
  togglePaused: (instanceId: string) => void;
  setFilter: (instanceId: string, filter: LevelFilter) => void;
  startAutonomyLoop: (instanceId: string) => void;
}

export const useMonitoringStore = create<MonitoringStore>((set, get) => ({
  logsByInstance: {},
  tasksByInstance: {},
  pausedByInstance: {},
  filterByInstance: {},
  wsBound: false,

  ensureInstance: (instanceId) => {
    const state = get();

    if (!state.wsBound) {
      mockWebSocket.subscribe('task.update', (event) => {
        set((current) => ({
          tasksByInstance: {
            ...current.tasksByInstance,
            [event.instanceId]: [
              ...(current.tasksByInstance[event.instanceId] ?? []).filter((t) => t.id !== event.payload.task.id),
              event.payload.task
            ]
          }
        }));
      });

      set({ wsBound: true });
    }

    set((current) => ({
      logsByInstance: current.logsByInstance[instanceId]
        ? current.logsByInstance
        : { ...current.logsByInstance, [instanceId]: [] },
      tasksByInstance: current.tasksByInstance[instanceId]
        ? current.tasksByInstance
        : { ...current.tasksByInstance, [instanceId]: [] },
      pausedByInstance: instanceId in current.pausedByInstance
        ? current.pausedByInstance
        : { ...current.pausedByInstance, [instanceId]: false },
      filterByInstance: current.filterByInstance[instanceId]
        ? current.filterByInstance
        : { ...current.filterByInstance, [instanceId]: 'all' }
    }));
  },

  appendLog: (instanceId, level, text) =>
    set((state) => ({
      logsByInstance: {
        ...state.logsByInstance,
        [instanceId]: [...(state.logsByInstance[instanceId] ?? []), buildLogLine(level, text)]
      }
    })),

  clearLogs: (instanceId) =>
    set((state) => ({
      logsByInstance: { ...state.logsByInstance, [instanceId]: [] }
    })),

  togglePaused: (instanceId) =>
    set((state) => ({
      pausedByInstance: {
        ...state.pausedByInstance,
        [instanceId]: !(state.pausedByInstance[instanceId] ?? false)
      }
    })),

  setFilter: (instanceId, filter) =>
    set((state) => ({
      filterByInstance: { ...state.filterByInstance, [instanceId]: filter }
    })),

  startAutonomyLoop: (instanceId) => {
    get().ensureInstance(instanceId);

    const newTask = buildAutonomyTask('Autonomy Loop');
    mockWebSocket.emitTaskUpdate(instanceId, newTask);
    mockWebSocket.emit({
      type: 'log.line',
      instanceId,
      timestamp: new Date().toISOString(),
      payload: { line: buildLogLine('info', 'Autonomy loop started.') }
    });

    let ticks = 0;
    const interval = setInterval(() => {
      ticks += 1;
      const updated = { ...newTask, updatedAt: new Date().toISOString() };
      mockWebSocket.emitTaskUpdate(instanceId, updated);
      mockWebSocket.emit({
        type: 'log.line',
        instanceId,
        timestamp: new Date().toISOString(),
        payload: { line: buildLogLine('info', `Autonomy tick #${ticks}`) }
      });

      if (ticks >= 8) {
        clearInterval(interval);
        mockWebSocket.emitTaskUpdate(instanceId, {
          ...updated,
          status: 'done',
          updatedAt: new Date().toISOString()
        });
        mockWebSocket.emit({
          type: 'log.line',
          instanceId,
          timestamp: new Date().toISOString(),
          payload: { line: buildLogLine('warn', 'Autonomy loop completed.') }
        });
      }
    }, 1000);
  }
}));
