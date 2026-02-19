import { Paper, Tabs } from '@mantine/core';
import { useState } from 'react';
import { LogsPanel } from './LogsPanel';
import { TasksPanel } from './TasksPanel';

interface MonitoringPanelProps {
  instanceId: string;
}

export function MonitoringPanel({ instanceId }: MonitoringPanelProps) {
  const [activeTab, setActiveTab] = useState<string | null>('logs');

  return (
    <Paper p="md" withBorder style={{ minHeight: 480, flex: 1 }}>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="logs">Logs</Tabs.Tab>
          <Tabs.Tab value="tasks">Tasks</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="logs" pt="sm">
          <LogsPanel instanceId={instanceId} />
        </Tabs.Panel>

        <Tabs.Panel value="tasks" pt="sm">
          <TasksPanel instanceId={instanceId} />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
