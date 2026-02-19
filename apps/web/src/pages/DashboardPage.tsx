import { AppShell, Badge, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { ChatPanel } from '../components/chat/ChatPanel';
import { InstancesSidebar } from '../components/instances/InstancesSidebar';
import { MonitoringPanel } from '../components/monitoring/MonitoringPanel';
import { useInstancesStore } from '../store/instancesStore';

const statusColor = {
  idle: 'gray',
  running: 'teal',
  paused: 'yellow'
} as const;

export function DashboardPage() {
  const { instances, activeInstanceId } = useInstancesStore();

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
            <MonitoringPanel instanceId={activeInstanceId} />
          </Group>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
