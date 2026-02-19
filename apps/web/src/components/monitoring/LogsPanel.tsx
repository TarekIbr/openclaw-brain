import { useEffect, useMemo } from 'react';
import { Button, Group, ScrollArea, Select, Stack, Text } from '@mantine/core';
import { mockWebSocket } from '../../services/mockWebSocket';
import { useMonitoringStore } from '../../store/monitoringStore';

interface LogsPanelProps {
  instanceId: string;
}

const levels = ['info', 'warn', 'error'] as const;

export function LogsPanel({ instanceId }: LogsPanelProps) {
  const {
    ensureInstance,
    appendLog,
    logsByInstance,
    filterByInstance,
    pausedByInstance,
    setFilter,
    togglePaused,
    clearLogs
  } = useMonitoringStore();

  const logs = logsByInstance[instanceId] ?? [];
  const filter = filterByInstance[instanceId] ?? 'all';
  const paused = pausedByInstance[instanceId] ?? false;

  useEffect(() => {
    ensureInstance(instanceId);
  }, [ensureInstance, instanceId]);

  useEffect(() => {
    const unsubscribe = mockWebSocket.subscribe('log.line', (event) => {
      if (event.instanceId !== instanceId) return;
      appendLog(instanceId, event.payload.line.level, event.payload.line.text);
    });

    return () => unsubscribe();
  }, [appendLog, instanceId]);

  useEffect(() => {
    if (!instanceId || paused) return;
    const stopFeed = mockWebSocket.startLogFeed(instanceId);
    return () => stopFeed();
  }, [instanceId, paused]);

  const visible = useMemo(() => {
    if (filter === 'all') return logs;
    return logs.filter((line) => line.level === filter);
  }, [filter, logs]);

  return (
    <Stack gap="sm">
      <Group grow>
        <Select
          label="Level filter"
          data={['all', ...levels]}
          value={filter}
          onChange={(value) => setFilter(instanceId, (value as 'all' | 'info' | 'warn' | 'error') ?? 'all')}
        />
      </Group>

      <Group>
        <Button size="xs" variant="light" onClick={() => togglePaused(instanceId)}>
          {paused ? 'Resume' : 'Pause'}
        </Button>
        <Button size="xs" variant="outline" color="red" onClick={() => clearLogs(instanceId)}>
          Clear
        </Button>
      </Group>

      <ScrollArea h={320} offsetScrollbars>
        <Stack gap={6}>
          {visible.slice().reverse().map((line) => (
            <Text key={line.id} size="sm">
              [{line.level}] {line.text}
            </Text>
          ))}
          {visible.length === 0 ? <Text size="sm" c="dimmed">No logs yet.</Text> : null}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
