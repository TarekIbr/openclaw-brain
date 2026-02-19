import { Badge, Button, Group, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useInstancesStore } from '../../store/instancesStore';
import { InstanceCreateModal } from './InstanceCreateModal';

const statusColor: Record<string, string> = {
  idle: 'gray',
  running: 'teal',
  paused: 'yellow'
};

export function InstancesSidebar() {
  const { instances, activeInstanceId, setActiveInstance, createInstance, renameInstance } = useInstancesStore();
  const [createOpen, setCreateOpen] = useState(false);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameDraft, setRenameDraft] = useState('');

  const activeInstance = useMemo(
    () => instances.find((instance) => instance.id === activeInstanceId),
    [instances, activeInstanceId]
  );

  return (
    <>
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={4}>Instances</Title>
          <Button size="xs" onClick={() => setCreateOpen(true)}>+ New Instance</Button>
        </Group>

        {instances.map((instance) => (
          <Paper
            key={instance.id}
            p="sm"
            withBorder
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveInstance(instance.id)}
            bg={instance.id === activeInstanceId ? 'dark.6' : undefined}
          >
            <Group justify="space-between" align="flex-start">
              <Stack gap={6} style={{ flex: 1 }}>
                {renameId === instance.id ? (
                  <Group gap="xs" wrap="nowrap">
                    <TextInput
                      size="xs"
                      value={renameDraft}
                      onChange={(event) => setRenameDraft(event.currentTarget.value)}
                    />
                    <Button
                      size="compact-xs"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (renameDraft.trim()) renameInstance(instance.id, renameDraft.trim());
                        setRenameId(null);
                      }}
                    >
                      Save
                    </Button>
                  </Group>
                ) : (
                  <Text fw={600}>{instance.name}</Text>
                )}
                <Badge size="sm" color={statusColor[instance.status]}>{instance.status}</Badge>
              </Stack>
              <Button
                variant="subtle"
                size="compact-xs"
                onClick={(event) => {
                  event.stopPropagation();
                  setRenameId(instance.id);
                  setRenameDraft(instance.name);
                }}
              >
                Rename
              </Button>
            </Group>
          </Paper>
        ))}

        {activeInstance ? (
          <Text size="sm" c="dimmed">Active: {activeInstance.name}</Text>
        ) : null}
      </Stack>

      <InstanceCreateModal
        opened={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={createInstance}
      />
    </>
  );
}
