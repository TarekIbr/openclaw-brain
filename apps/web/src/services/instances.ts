import { mockData } from './mock/data';
import type { Instance, InstanceStatus } from '../types/models';

const buildId = () => `inst-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export function listInstances(): Instance[] {
  return mockData.getInstances();
}

export function buildInstance(name: string, status: InstanceStatus): Instance {
  return {
    id: buildId(),
    name,
    status
  };
}
