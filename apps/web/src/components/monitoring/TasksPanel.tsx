import { Button, ScrollArea, Stack, Table, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useMonitoringStore } from '../../store/monitoringStore';

interface TasksPanelProps {
  instanceId: string;
}

export function TasksPanel({ instanceId }: TasksPanelProps) {
  const { ensureInstance, tasksByInstance, startAutonomyLoop } = useMonitoringStore();
  const tasks = tasksByInstance[instanceId] ?? [];

  useEffect(() => {
    ensureInstance(instanceId);
  }, [ensureInstance, instanceId]);

  return (
    <Stack gap="sm">
      <Button onClick={() => startAutonomyLoop(instanceId)}>Start Autonomy Loop</Button>

      <ScrollArea h={320} offsetScrollbars>
        <Table withTableBorder withColumnBorders striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Task</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Started</Table.Th>
              <Table.Th>Updated</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tasks.map((task) => (
              <Table.Tr key={task.id}>
                <Table.Td>{task.name}</Table.Td>
                <Table.Td>{task.type}</Table.Td>
                <Table.Td>{task.status}</Table.Td>
                <Table.Td>{new Date(task.startedAt).toLocaleTimeString()}</Table.Td>
                <Table.Td>{new Date(task.updatedAt).toLocaleTimeString()}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        {tasks.length === 0 ? <Text size="sm" c="dimmed" mt="sm">No tasks yet.</Text> : null}
      </ScrollArea>
    </Stack>
  );
}
