import { create } from 'zustand';
import { mockData } from '../services/mock/data';
import type { Agent } from '../types/models';

type AgentInput = Pick<Agent, 'name' | 'modelPolicy' | 'toolsPolicy' | 'systemPrompt' | 'versionLabel'>;

interface AgentsStore {
  agents: Agent[];
  addAgent: (input: AgentInput) => void;
  updateAgent: (id: string, input: AgentInput) => void;
  deleteAgent: (id: string) => void;
}

const initialAgents = mockData.getAgents();

export const useAgentsStore = create<AgentsStore>((set) => ({
  agents: initialAgents,
  addAgent: (input) =>
    set((state) => ({
      agents: [
        ...state.agents,
        {
          id: `ag-${Date.now()}`,
          ...input,
          updatedAt: new Date().toISOString()
        }
      ]
    })),
  updateAgent: (id, input) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? { ...agent, ...input, updatedAt: new Date().toISOString() } : agent
      )
    })),
  deleteAgent: (id) =>
    set((state) => ({
      agents: state.agents.filter((agent) => agent.id !== id)
    }))
}));
