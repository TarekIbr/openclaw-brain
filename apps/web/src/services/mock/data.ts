import type { Agent, Instance, LogLine, Message, Task } from '../../types/models';

const instances: Instance[] = [
  { id: 'inst-1', name: 'Prod Brain', status: 'running' },
  { id: 'inst-2', name: 'Staging Brain', status: 'idle' },
  { id: 'inst-3', name: 'Local Lab', status: 'paused' }
];

const agents: Agent[] = [
  {
    id: 'ag-1',
    name: 'Jarvis',
    modelPolicy: 'balanced',
    toolsPolicy: 'standard',
    systemPrompt: 'You are a loyal AI butler. Be clear and proactive.',
    versionLabel: 'v1.0',
    updatedAt: '2026-02-19T23:00:00Z'
  },
  {
    id: 'ag-2',
    name: 'Scout',
    modelPolicy: 'fast',
    toolsPolicy: 'restricted',
    systemPrompt: 'You are an ops scout. Prioritize short incident summaries.',
    versionLabel: 'v0.9',
    updatedAt: '2026-02-19T23:03:00Z'
  }
];

const tasks: Task[] = [];
const logs: LogLine[] = [];

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
