import { mockData } from './mock/data';
import { fakeAssistantStream } from './mock/fakeStream';
import type { Message } from '../types/models';

export function getConversationSeed(instanceId: string): Message[] {
  return mockData.getConversationSeed(instanceId);
}

export function buildAssistantResponse(instanceId: string, userText: string): string {
  return `Mock assistant stream for ${instanceId}: Received "${userText}". Responding token by token.`;
}

export async function streamAssistantResponse(
  fullText: string,
  onToken: (chunk: string) => void
): Promise<void> {
  await fakeAssistantStream(fullText, onToken);
}
