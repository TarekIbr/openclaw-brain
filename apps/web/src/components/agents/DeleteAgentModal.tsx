import { Button, Group, Modal, Text } from '@mantine/core';

interface DeleteAgentModalProps {
  opened: boolean;
  agentName?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteAgentModal({ opened, agentName, onCancel, onConfirm }: DeleteAgentModalProps) {
  return (
    <Modal opened={opened} onClose={onCancel} title="Delete Agent" centered>
      <Text size="sm">Delete agent <strong>{agentName ?? ''}</strong>? This is mock-only but will remove it from the UI list.</Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onCancel}>Cancel</Button>
        <Button color="red" onClick={onConfirm}>Delete</Button>
      </Group>
    </Modal>
  );
}
