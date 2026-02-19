import { create } from 'zustand';
import type { LogLine, Task } from '../types/models';
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

  ensureInstance: (instanceId) =>
    set((state) => ({
      logsByInstance: state.logsByInstance[instanceId]
        ? state.logsByInstance
        : { ...state.logsByInstance, [instanceId]: [] },
      tasksByInstance: state.tasksByInstance[instanceId]
        ? state.tasksByInstance
        : { ...state.tasksByInstance, [instanceId]: [] },
      pausedByInstance: instanceId in state.pausedByInstance
        ? state.pausedByInstance
        : { ...state.pausedByInstance, [instanceId]: false },
      filterByInstance: state.filterByInstance[instanceId]
        ? state.filterByInstance
        : { ...state.filterByInstance, [instanceId]: 'all' }
    })),

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
    const taskId = newTask.id;

    set((state) => ({
      tasksByInstance: {
        ...state.tasksByInstance,
        [instanceId]: [...(state.tasksByInstance[instanceId] ?? []), newTask]
      }
    }));

    get().appendLog(instanceId, 'info', 'Autonomy loop started.');

    let ticks = 0;
    const interval = setInterval(() => {
      ticks += 1;
      get().appendLog(instanceId, 'info', `Autonomy tick #${ticks}`);

      set((state) => ({
        tasksByInstance: {
          ...state.tasksByInstance,
          [instanceId]: (state.tasksByInstance[instanceId] ?? []).map((task) =>
            task.id === taskId ? { ...task, updatedAt: new Date().toISOString() } : task
          )
        }
      }));

      if (ticks >= 8) {
        clearInterval(interval);
        set((state) => ({
          tasksByInstance: {
            ...state.tasksByInstance,
            [instanceId]: (state.tasksByInstance[instanceId] ?? []).map((task) =>
              task.id === taskId ? { ...task, status: 'done', updatedAt: new Date().toISOString() } : task
            )
          }
        }));
        get().appendLog(instanceId, 'warn', 'Autonomy loop completed.');
      }
    }, 1000);
  }
}));
