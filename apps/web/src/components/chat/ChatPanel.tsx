import { useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Button, Group, Paper, ScrollArea, Stack, Text, Textarea, Title } from '@mantine/core';
import { useChatStore } from '../../store/chatStore';
import type { Message } from '../../types/models';

interface ChatPanelProps {
  instanceId: string;
}

const bubbleColor: Record<Message['author'], string> = {
  user: 'blue',
  assistant: 'violet',
  system: 'gray',
  tool: 'teal'
};

export function ChatPanel({ instanceId }: ChatPanelProps) {
  const [draft, setDraft] = useState('');
  const viewportRef = useRef<HTMLDivElement>(null);
  const shouldStickToBottomRef = useRef(true);

  const { ensureInstanceConversation, sendUserMessage, conversations, streamingByInstance } = useChatStore();

  const messages = useMemo(() => conversations[instanceId] ?? [], [conversations, instanceId]);
  const isStreaming = streamingByInstance[instanceId] ?? false;

  useEffect(() => {
    ensureInstanceConversation(instanceId);
  }, [ensureInstanceConversation, instanceId]);

  const lastMessageText = messages.length > 0 ? messages[messages.length - 1].text : '';

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !shouldStickToBottomRef.current) return;
    viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
  }, [messages.length, lastMessageText]);

  const onScroll = (position: { x: number; y: number }) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const distanceFromBottom = viewport.scrollHeight - position.y - viewport.clientHeight;
    shouldStickToBottomRef.current = distanceFromBottom < 60;
  };

  const onSend = async () => {
    const text = draft.trim();
    if (!text || isStreaming) return;
    setDraft('');
    await sendUserMessage(instanceId, text);
  };

  return (
    <Paper p="md" withBorder style={{ minHeight: 480, display: 'flex', flexDirection: 'column' }}>
      <Stack gap="sm" style={{ height: '100%' }}>
        <Title order={4}>Chat</Title>

        <ScrollArea viewportRef={viewportRef} onScrollPositionChange={onScroll} h={340} offsetScrollbars>
          <Stack gap="xs" pr="sm">
            {messages.map((message) => (
              <Paper key={message.id} p="sm" withBorder>
                <Group justify="space-between" mb={4}>
                  <Badge color={bubbleColor[message.author]} size="sm">{message.author}</Badge>
                  <Text size="xs" c="dimmed">{new Date(message.createdAt).toLocaleTimeString()}</Text>
                </Group>
                <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>{message.text || '…'}</Text>
              </Paper>
            ))}
          </Stack>
        </ScrollArea>

        <Textarea
          placeholder="Write a message..."
          minRows={2}
          maxRows={6}
          autosize
          value={draft}
          onChange={(event) => setDraft(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              void onSend();
            }
          }}
        />

        <Group justify="space-between">
          <Text size="xs" c="dimmed">Enter = send • Shift+Enter = newline</Text>
          <Button onClick={() => void onSend()} loading={isStreaming}>Send</Button>
        </Group>
      </Stack>
    </Paper>
  );
}
