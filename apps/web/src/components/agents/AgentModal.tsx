import { Button, Group, Modal, Select, Stack, TextInput, Textarea } from '@mantine/core';
import { useEffect, useState } from 'react';
import type { Agent } from '../../types/models';

type AgentInput = Pick<Agent, 'name' | 'modelPolicy' | 'toolsPolicy' | 'systemPrompt' | 'versionLabel'>;

interface AgentModalProps {
  opened: boolean;
  mode: 'add' | 'edit';
  initial?: Agent;
  onClose: () => void;
  onSubmit: (input: AgentInput) => void;
}

const emptyState: AgentInput = {
  name: '',
  modelPolicy: 'balanced',
  toolsPolicy: 'standard',
  systemPrompt: '',
  versionLabel: ''
};

export function AgentModal({ opened, mode, initial, onClose, onSubmit }: AgentModalProps) {
  const [form, setForm] = useState<AgentInput>(emptyState);

  useEffect(() => {
    if (!opened) return;
    if (initial) {
      setForm({
        name: initial.name,
        modelPolicy: initial.modelPolicy,
        toolsPolicy: initial.toolsPolicy,
        systemPrompt: initial.systemPrompt,
        versionLabel: initial.versionLabel
      });
      return;
    }
    setForm(emptyState);
  }, [opened, initial]);

  return (
    <Modal opened={opened} onClose={onClose} title={mode === 'add' ? 'Add Agent' : 'Edit Agent'} size="lg" centered>
      <Stack>
        <TextInput
          label="Name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.currentTarget.value }))}
        />
        <Select
          label="Model policy"
          data={['balanced', 'fast', 'deep']}
          value={form.modelPolicy}
          onChange={(value) => setForm((prev) => ({ ...prev, modelPolicy: (value as Agent['modelPolicy']) ?? 'balanced' }))}
        />
        <Select
          label="Tools policy"
          data={['restricted', 'standard', 'elevated']}
          value={form.toolsPolicy}
          onChange={(value) => setForm((prev) => ({ ...prev, toolsPolicy: (value as Agent['toolsPolicy']) ?? 'standard' }))}
        />
        <Textarea
          label="System prompt"
          minRows={5}
          autosize
          value={form.systemPrompt}
          onChange={(event) => setForm((prev) => ({ ...prev, systemPrompt: event.currentTarget.value }))}
        />
        <TextInput
          label="Version label"
          placeholder="v1.1"
          value={form.versionLabel}
          onChange={(event) => setForm((prev) => ({ ...prev, versionLabel: event.currentTarget.value }))}
        />

        <Group justify="flex-end">
          <Button variant="default" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(form)}>{mode === 'add' ? 'Create' : 'Save'}</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
