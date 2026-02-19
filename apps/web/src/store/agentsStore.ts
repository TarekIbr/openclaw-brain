import { create } from 'zustand';
import type { Agent } from '../types/models';
import { buildAgent, listAgents, patchAgent } from '../services/agents';

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
    set((state) => ({
      agents: [
        ...state.agents,
        buildAgent(input)
      ]
    })),
  updateAgent: (id, input) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? patchAgent(agent, input) : agent
      )
    })),
  deleteAgent: (id) =>
    set((state) => ({
      agents: state.agents.filter((agent) => agent.id !== id)
    }))
}));
