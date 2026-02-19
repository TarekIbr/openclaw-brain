export type InstanceStatus = 'idle' | 'running' | 'paused';

export interface Instance {
  id: string;
  name: string;
  status: InstanceStatus;
}

export interface Agent {
  id: string;
  name: string;
  modelPolicy: 'balanced' | 'fast' | 'deep';
  toolsPolicy: 'restricted' | 'standard' | 'elevated';
  systemPrompt: string;
  versionLabel: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  author: 'user' | 'assistant' | 'system' | 'tool';
  text: string;
  createdAt: string;
}

export interface Task {
  id: string;
  name: string;
  type: string;
  status: 'queued' | 'running' | 'done' | 'failed';
  startedAt: string;
  updatedAt: string;
}

export interface LogLine {
  id: string;
  level: 'info' | 'warn' | 'error';
  text: string;
  createdAt: string;
}
