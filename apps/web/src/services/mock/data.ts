import type { Agent, Event, Instance, LogLine, Message, Task } from '../../types/models';

export const instances: Instance[] = [
  { id: 'inst-1', name: 'Prod Brain', status: 'online' },
  { id: 'inst-2', name: 'Staging Brain', status: 'degraded' }
];

export const agents: Agent[] = [
  { id: 'ag-1', name: 'Jarvis', role: 'Butler AI', instanceId: 'inst-1' },
  { id: 'ag-2', name: 'Scout', role: 'Ops Monitor', instanceId: 'inst-2' }
];

export const messages: Message[] = [
  { id: 'm-1', author: 'user', text: 'Status report?', createdAt: '2026-02-19T23:00:00Z' },
  { id: 'm-2', author: 'agent', text: 'All systems nominal in prod.', createdAt: '2026-02-19T23:00:04Z' }
];

export const tasks: Task[] = [
  { id: 't-1', title: 'Wire event protocol', state: 'in_progress' },
  { id: 't-2', title: 'Design task panel', state: 'todo' }
];

export const logLines: LogLine[] = [
  { id: 'l-1', level: 'info', text: 'Dashboard initialized', createdAt: '2026-02-19T23:00:01Z' },
  { id: 'l-2', level: 'warn', text: 'Mock queue latency elevated', createdAt: '2026-02-19T23:00:07Z' }
];

export const events: Event[] = [
  {
    id: 'e-1',
    type: 'message.created',
    createdAt: '2026-02-19T23:00:04Z',
    payload: { messageId: 'm-2' }
  }
];
