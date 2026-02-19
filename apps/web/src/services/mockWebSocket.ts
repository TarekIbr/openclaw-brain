import type { Agent, Instance, LogLine, Task } from '../types/models';
import type {
  AgentUpdateEvent,
  AppEvent,
  ChatDeltaEvent,
  ChatDoneEvent,
  InstanceUpdateEvent,
  LogLineEvent,
  TaskUpdateEvent
} from '../types/events';
import { buildLogLine } from './monitoring';

type Handler<T extends AppEvent> = (event: T) => void;

type HandlerMap = {
  [K in AppEvent['type']]: Set<Handler<Extract<AppEvent, { type: K }>>>;
};

class MockWebSocket {
  private handlers: HandlerMap = {
    'chat.delta': new Set(),
    'chat.done': new Set(),
    'log.line': new Set(),
    'task.update': new Set(),
    'agent.update': new Set(),
    'instance.update': new Set()
  };

  subscribe<K extends AppEvent['type']>(type: K, handler: Handler<Extract<AppEvent, { type: K }>>) {
    this.handlers[type].add(handler as never);
    return () => {
      this.handlers[type].delete(handler as never);
    };
  }

  emit(event: AppEvent) {
    this.handlers[event.type].forEach((handler) => {
      (handler as Handler<typeof event>)(event);
    });
  }

  startLogFeed(instanceId: string): () => void {
    const interval = setInterval(() => {
      const random = Math.random();
      const level: LogLine['level'] = random < 0.7 ? 'info' : random < 0.9 ? 'warn' : 'error';
      const event: LogLineEvent = {
        type: 'log.line',
        instanceId,
        timestamp: new Date().toISOString(),
        payload: {
          line: buildLogLine(level, `Live event on ${instanceId} (${level})`)
        }
      };
      this.emit(event);
    }, 1000);

    return () => clearInterval(interval);
  }

  async emitChatStream(instanceId: string, messageId: string, text: string): Promise<void> {
    const tokens = text.split(/(\s+)/).filter(Boolean);
    for (const chunk of tokens) {
      const deltaEvent: ChatDeltaEvent = {
        type: 'chat.delta',
        instanceId,
        timestamp: new Date().toISOString(),
        payload: { messageId, chunk }
      };
      this.emit(deltaEvent);
      await new Promise((resolve) => setTimeout(resolve, 35));
    }

    const doneEvent: ChatDoneEvent = {
      type: 'chat.done',
      instanceId,
      timestamp: new Date().toISOString(),
      payload: { messageId }
    };
    this.emit(doneEvent);
  }

  emitTaskUpdate(instanceId: string, task: Task) {
    const event: TaskUpdateEvent = {
      type: 'task.update',
      instanceId,
      timestamp: new Date().toISOString(),
      payload: { task }
    };
    this.emit(event);
  }

  emitAgentUpdate(instanceId: string, agent: Agent) {
    const event: AgentUpdateEvent = {
      type: 'agent.update',
      instanceId,
      timestamp: new Date().toISOString(),
      payload: { agent }
    };
    this.emit(event);
  }

  emitInstanceUpdate(instanceId: string, instance: Instance) {
    const event: InstanceUpdateEvent = {
      type: 'instance.update',
      instanceId,
      timestamp: new Date().toISOString(),
      payload: { instance }
    };
    this.emit(event);
  }
}

export const mockWebSocket = new MockWebSocket();
