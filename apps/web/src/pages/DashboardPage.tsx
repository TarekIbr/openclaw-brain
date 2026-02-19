import { useState } from 'react';
import {
  AppShell,
  Badge,
  Box,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title
} from '@mantine/core';
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
  const [draft, setDraft] = useState('');

  const { instances, activeInstanceId } = useInstancesStore();
  const messages = mockData.getMessages();
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
            <Paper p="md" withBorder style={{ minHeight: 420, flex: 2 }}>
              <Stack gap="sm">
                <Title order={4}>Chat</Title>
                {messages.map((message) => (
                  <Box key={message.id}>
                    <Text size="sm" c="dimmed">{message.author}</Text>
                    <Text>{message.text}</Text>
                  </Box>
                ))}
                <TextInput
                  placeholder="Type a mock message"
                  value={draft}
                  onChange={(event) => setDraft(event.currentTarget.value)}
                />
              </Stack>
            </Paper>

            <Paper p="md" withBorder style={{ minHeight: 420, flex: 1 }}>
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
