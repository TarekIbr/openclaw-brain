export type InstanceStatus = 'online' | 'degraded' | 'offline';

export interface Instance {
  id: string;
  name: string;
  status: InstanceStatus;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  instanceId: string;
}

export interface Message {
  id: string;
  author: 'user' | 'agent' | 'system';
  text: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  state: 'todo' | 'in_progress' | 'done';
}

export interface LogLine {
  id: string;
  level: 'info' | 'warn' | 'error';
  text: string;
  createdAt: string;
}
