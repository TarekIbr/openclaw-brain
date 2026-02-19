import type { Agent, Instance, LogLine, Message, Task } from '../../types/models';

const instances: Instance[] = [
  { id: 'inst-1', name: 'Prod Brain', status: 'running' },
  { id: 'inst-2', name: 'Staging Brain', status: 'idle' },
  { id: 'inst-3', name: 'Local Lab', status: 'paused' }
];

const agents: Agent[] = [
  { id: 'ag-1', name: 'Jarvis', role: 'Butler AI', instanceId: 'inst-1' },
  { id: 'ag-2', name: 'Scout', role: 'Ops Monitor', instanceId: 'inst-2' }
];

const tasks: Task[] = [
  { id: 't-1', title: 'Wire mock event stream', state: 'in_progress' },
  { id: 't-2', title: 'Review dashboard layout', state: 'todo' }
];

const logs: LogLine[] = [
  { id: 'l-1', level: 'info', text: 'Dashboard boot complete', createdAt: '2026-02-19T23:00:01Z' },
  { id: 'l-2', level: 'warn', text: 'Staging response time elevated', createdAt: '2026-02-19T23:00:06Z' }
];

const seedMessages: Message[] = [
  { id: 'm-1', author: 'system', text: 'Conversation initialized.', createdAt: '2026-02-19T23:00:00Z' },
  { id: 'm-2', author: 'user', text: 'How is the system health?', createdAt: '2026-02-19T23:00:02Z' },
  { id: 'm-3', author: 'assistant', text: 'Prod is stable. Staging shows mild latency.', createdAt: '2026-02-19T23:00:04Z' },
  { id: 'm-4', author: 'tool', text: 'tool.run: healthcheck --mock', createdAt: '2026-02-19T23:00:05Z' }
];

export const mockData = {
  getInstances: () => instances,
  getAgents: () => agents,
  getTasks: () => tasks,
  getLogs: () => logs,
  getConversationSeed: (instanceId: string) =>
    seedMessages.map((message) => ({
      ...message,
      id: `${instanceId}-${message.id}`
    }))
};
