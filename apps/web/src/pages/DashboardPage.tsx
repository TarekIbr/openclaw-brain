import { useState } from 'react';
import { AppShell, Badge, Group, Paper, Stack, Tabs, Text, Title } from '@mantine/core';
import { ChatPanel } from '../components/chat/ChatPanel';
import { InstancesSidebar } from '../components/instances/InstancesSidebar';
import { mockData } from '../services/mock/data';
import { useInstancesStore } from '../store/instancesStore';

const statusColor = {
  idle: 'gray',
  running: 'teal',
  paused: 'yellow'
} as const;

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<string | null>('logs');

  const { instances, activeInstanceId } = useInstancesStore();
  const tasks = mockData.getTasks();
  const logs = mockData.getLogs();

  const activeInstance = instances.find((instance) => instance.id === activeInstanceId) ?? instances[0];

  return (
    <AppShell navbar={{ width: 320, breakpoint: 'sm' }} padding="md">
      <AppShell.Navbar p="md">
        <InstancesSidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Stack gap="md">
          <Paper p="md" withBorder>
            <Group justify="space-between">
              <Title order={3}>Dashboard</Title>
              {activeInstance ? (
                <Group gap="xs">
                  <Text size="sm">Active: {activeInstance.name}</Text>
                  <Badge color={statusColor[activeInstance.status]}>{activeInstance.status}</Badge>
                </Group>
              ) : null}
            </Group>
          </Paper>

          <Group align="flex-start" grow>
            <ChatPanel instanceId={activeInstanceId} />

            <Paper p="md" withBorder style={{ minHeight: 480, flex: 1 }}>
              <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Tab value="logs">Logs</Tabs.Tab>
                  <Tabs.Tab value="tasks">Tasks</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="logs" pt="sm">
                  <Stack gap="xs">
                    {logs.map((line) => (
                      <Text key={line.id} size="sm">[{line.level}] {line.text}</Text>
                    ))}
                  </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="tasks" pt="sm">
                  <Stack gap="xs">
                    {tasks.map((task) => (
                      <Text key={task.id} size="sm">{task.title} ({task.state})</Text>
                    ))}
                  </Stack>
                </Tabs.Panel>
              </Tabs>
            </Paper>
          </Group>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
