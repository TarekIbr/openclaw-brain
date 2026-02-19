import { mockData } from './mock/data';
import type { Agent } from '../types/models';

export type AgentInput = Pick<Agent, 'name' | 'modelPolicy' | 'toolsPolicy' | 'systemPrompt' | 'versionLabel'>;

const buildId = () => `ag-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export function listAgents(): Agent[] {
  return mockData.getAgents();
}

export function buildAgent(input: AgentInput): Agent {
  return {
    id: buildId(),
    ...input,
    updatedAt: new Date().toISOString()
  };
}

export function patchAgent(agent: Agent, input: AgentInput): Agent {
  return {
    ...agent,
    ...input,
    updatedAt: new Date().toISOString()
  };
}
