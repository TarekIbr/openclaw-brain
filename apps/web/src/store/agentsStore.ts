import { create } from 'zustand';
import type { Agent } from '../types/models';
import { buildAgent, listAgents, patchAgent } from '../services/agents';
import { mockWebSocket } from '../services/mockWebSocket';

type AgentInput = Pick<Agent, 'name' | 'modelPolicy' | 'toolsPolicy' | 'systemPrompt' | 'versionLabel'>;

interface AgentsStore {
  agents: Agent[];
  addAgent: (input: AgentInput) => void;
  updateAgent: (id: string, input: AgentInput) => void;
  deleteAgent: (id: string) => void;
}

const initialAgents = listAgents();

export const useAgentsStore = create<AgentsStore>((set) => ({
  agents: initialAgents,
  addAgent: (input) =>
    set((state) => {
      const created = buildAgent(input);
      mockWebSocket.emitAgentUpdate('global', created);
      return {
        agents: [...state.agents, created]
      };
    }),
  updateAgent: (id, input) =>
    set((state) => ({
      agents: state.agents.map((agent) => {
        const updated = agent.id === id ? patchAgent(agent, input) : agent;
        if (agent.id === id) mockWebSocket.emitAgentUpdate('global', updated);
        return updated;
      })
    })),
  deleteAgent: (id) =>
    set((state) => ({
      agents: state.agents.filter((agent) => agent.id !== id)
    }))
}));
