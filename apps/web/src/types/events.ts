import type { Agent, Instance, LogLine, Task } from './models';

export type EventType =
  | 'chat.delta'
  | 'chat.done'
  | 'log.line'
  | 'task.update'
  | 'agent.update'
  | 'instance.update';

interface EventBase<T extends EventType, P> {
  type: T;
  instanceId: string;
  timestamp: string;
  payload: P;
}

export type ChatDeltaEvent = EventBase<'chat.delta', { messageId: string; chunk: string }>;
export type ChatDoneEvent = EventBase<'chat.done', { messageId: string }>;
export type LogLineEvent = EventBase<'log.line', { line: LogLine }>;
export type TaskUpdateEvent = EventBase<'task.update', { task: Task }>;
export type AgentUpdateEvent = EventBase<'agent.update', { agent: Agent }>;
export type InstanceUpdateEvent = EventBase<'instance.update', { instance: Instance }>;

export type AppEvent =
  | ChatDeltaEvent
  | ChatDoneEvent
  | LogLineEvent
  | TaskUpdateEvent
  | AgentUpdateEvent
  | InstanceUpdateEvent;
