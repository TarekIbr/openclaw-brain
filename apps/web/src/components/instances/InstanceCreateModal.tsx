import { Button, Group, Modal, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import type { InstanceStatus } from '../../types/models';

interface InstanceCreateModalProps {
  opened: boolean;
  onClose: () => void;
  onCreate: (name: string, status: InstanceStatus) => void;
}

export function InstanceCreateModal({ opened, onClose, onCreate }: InstanceCreateModalProps) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<InstanceStatus>('idle');

  const submit = () => {
    if (!name.trim()) return;
    onCreate(name.trim(), status);
    setName('');
    setStatus('idle');
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="New Instance" centered>
      <TextInput
        label="Name"
        placeholder="My Instance"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <Select
        mt="sm"
        label="Status"
        data={['idle', 'running', 'paused']}
        value={status}
        onChange={(value) => setStatus((value as InstanceStatus) ?? 'idle')}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose}>Cancel</Button>
        <Button onClick={submit}>Create</Button>
      </Group>
    </Modal>
  );
}
