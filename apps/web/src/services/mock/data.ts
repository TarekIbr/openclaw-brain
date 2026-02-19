import type { Agent, Instance, LogLine, Message, Task } from '../../types/models';

const instances: Instance[] = [
  { id: 'inst-1', name: 'Prod Brain', status: 'online' },
  { id: 'inst-2', name: 'Staging Brain', status: 'degraded' },
  { id: 'inst-3', name: 'Local Lab', status: 'offline' }
];

const agents: Agent[] = [
  { id: 'ag-1', name: 'Jarvis', role: 'Butler AI', instanceId: 'inst-1' },
  { id: 'ag-2', name: 'Scout', role: 'Ops Monitor', instanceId: 'inst-2' }
];

const messages: Message[] = [
  { id: 'm-1', author: 'user', text: 'How is the system health?', createdAt: '2026-02-19T23:00:00Z' },
  { id: 'm-2', author: 'agent', text: 'Prod stable, staging has minor lag spikes.', createdAt: '2026-02-19T23:00:03Z' }
];

const tasks: Task[] = [
  { id: 't-1', title: 'Wire mock event stream', state: 'in_progress' },
  { id: 't-2', title: 'Review dashboard layout', state: 'todo' }
];

const logs: LogLine[] = [
  { id: 'l-1', level: 'info', text: 'Dashboard boot complete', createdAt: '2026-02-19T23:00:01Z' },
  { id: 'l-2', level: 'warn', text: 'Staging response time elevated', createdAt: '2026-02-19T23:00:06Z' }
];

export const mockData = {
  getInstances: () => instances,
  getAgents: () => agents,
  getMessages: () => messages,
  getTasks: () => tasks,
  getLogs: () => logs
};
