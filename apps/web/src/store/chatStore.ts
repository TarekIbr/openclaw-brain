import { create } from 'zustand';
import type { Message } from '../types/models';
import { buildAssistantResponse, getConversationSeed } from '../services/chat';
import { mockWebSocket } from '../services/mockWebSocket';

type Conversations = Record<string, Message[]>;

interface ChatStore {
  conversations: Conversations;
  streamingByInstance: Record<string, boolean>;
  ensureInstanceConversation: (instanceId: string) => void;
  sendUserMessage: (instanceId: string, text: string) => Promise<void>;
}

const buildId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: {},
  streamingByInstance: {},

  ensureInstanceConversation: (instanceId) => {
    const current = get().conversations[instanceId];
    if (current) return;

    set((state) => ({
      conversations: {
        ...state.conversations,
        [instanceId]: getConversationSeed(instanceId)
      }
    }));
  },

  sendUserMessage: async (instanceId, text) => {
    if (!text.trim()) return;

    get().ensureInstanceConversation(instanceId);

    const userMessage: Message = {
      id: `msg-${buildId()}`,
      author: 'user',
      text: text.trim(),
      createdAt: new Date().toISOString()
    };

    const assistantMessageId = `msg-${buildId()}`;

    set((state) => ({
      conversations: {
        ...state.conversations,
        [instanceId]: [
          ...(state.conversations[instanceId] ?? []),
          userMessage,
          {
            id: assistantMessageId,
            author: 'assistant',
            text: '',
            createdAt: new Date().toISOString()
          }
        ]
      },
      streamingByInstance: {
        ...state.streamingByInstance,
        [instanceId]: true
      }
    }));

    const unsubscribeDelta = mockWebSocket.subscribe('chat.delta', (event) => {
      if (event.instanceId !== instanceId || event.payload.messageId !== assistantMessageId) return;
      set((state) => ({
        conversations: {
          ...state.conversations,
          [instanceId]: (state.conversations[instanceId] ?? []).map((message) =>
            message.id === assistantMessageId
              ? { ...message, text: `${message.text}${event.payload.chunk}` }
              : message
          )
        }
      }));
    });

    const donePromise = new Promise<void>((resolve) => {
      const unsubscribeDone = mockWebSocket.subscribe('chat.done', (event) => {
        if (event.instanceId !== instanceId || event.payload.messageId !== assistantMessageId) return;
        unsubscribeDone();
        resolve();
      });
    });

    const response = buildAssistantResponse(instanceId, text.trim());
    await mockWebSocket.emitChatStream(instanceId, assistantMessageId, response);
    await donePromise;

    unsubscribeDelta();

    set((state) => ({
      streamingByInstance: {
        ...state.streamingByInstance,
        [instanceId]: false
      }
    }));
  }
}));
