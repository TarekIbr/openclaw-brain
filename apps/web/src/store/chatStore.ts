import { create } from 'zustand';
import type { Message } from '../types/models';
import { buildAssistantResponse, getConversationSeed, streamAssistantResponse } from '../services/chat';

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

    const response = buildAssistantResponse(instanceId, text.trim());

    await streamAssistantResponse(response, (chunk) => {
      set((state) => ({
        conversations: {
          ...state.conversations,
          [instanceId]: (state.conversations[instanceId] ?? []).map((message) =>
            message.id === assistantMessageId
              ? { ...message, text: `${message.text}${chunk}` }
              : message
          )
        }
      }));
    });

    set((state) => ({
      streamingByInstance: {
        ...state.streamingByInstance,
        [instanceId]: false
      }
    }));
  }
}));
