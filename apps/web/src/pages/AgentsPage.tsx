import { Badge, Button, Group, Paper, Stack, Table, Text, Title } from '@mantine/core';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AgentModal } from '../components/agents/AgentModal';
import { DeleteAgentModal } from '../components/agents/DeleteAgentModal';
import { useAgentsStore } from '../store/agentsStore';
import type { Agent } from '../types/models';

const toolsPolicyColor: Record<Agent['toolsPolicy'], string> = {
  restricted: 'gray',
  standard: 'blue',
  elevated: 'orange'
};

export function AgentsPage() {
  const { agents, addAgent, updateAgent, deleteAgent } = useAgentsStore();

  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const editingAgent = useMemo(() => agents.find((a) => a.id === editId), [agents, editId]);
  const deletingAgent = useMemo(() => agents.find((a) => a.id === deleteId), [agents, deleteId]);

  return (
    <Stack p="md" gap="md">
      <Group justify="space-between">
        <div>
          <Title order={2}>Agent Manager</Title>
          <Text size="sm" c="dimmed">Mock CRUD UI for agent definitions</Text>
        </div>
        <Group>
          <Button variant="default" component={Link} to="/">Back to Dashboard</Button>
          <Button onClick={() => setAddOpen(true)}>Add Agent</Button>
        </Group>
      </Group>

      <Paper withBorder p="md">
        <Table withTableBorder withColumnBorders striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Model policy</Table.Th>
              <Table.Th>Tools policy</Table.Th>
              <Table.Th>Updated</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {agents.map((agent) => (
              <Table.Tr key={agent.id}>
                <Table.Td>{agent.name}</Table.Td>
                <Table.Td>{agent.modelPolicy}</Table.Td>
                <Table.Td>
                  <Badge color={toolsPolicyColor[agent.toolsPolicy]}>{agent.toolsPolicy}</Badge>
                </Table.Td>
                <Table.Td>{new Date(agent.updatedAt).toLocaleString()}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button size="xs" variant="light" onClick={() => setEditId(agent.id)}>Edit</Button>
                    <Button size="xs" color="red" variant="light" onClick={() => setDeleteId(agent.id)}>Delete</Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      <AgentModal
        opened={addOpen}
        mode="add"
        onClose={() => setAddOpen(false)}
        onSubmit={(input) => {
          addAgent(input);
          setAddOpen(false);
        }}
      />

      <AgentModal
        opened={Boolean(editingAgent)}
        mode="edit"
        initial={editingAgent}
        onClose={() => setEditId(null)}
        onSubmit={(input) => {
          if (!editingAgent) return;
          updateAgent(editingAgent.id, input);
          setEditId(null);
        }}
      />

      <DeleteAgentModal
        opened={Boolean(deletingAgent)}
        agentName={deletingAgent?.name}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (!deletingAgent) return;
          deleteAgent(deletingAgent.id);
          setDeleteId(null);
        }}
      />
    </Stack>
  );
}
