import { create } from 'zustand';
import type { Instance, InstanceStatus } from '../types/models';
import { mockData } from '../services/mock/data';

interface InstancesStore {
  instances: Instance[];
  activeInstanceId: string;
  setActiveInstance: (id: string) => void;
  createInstance: (name: string, status: InstanceStatus) => void;
  renameInstance: (id: string, name: string) => void;
}

const initialInstances = mockData.getInstances();

export const useInstancesStore = create<InstancesStore>((set) => ({
  instances: initialInstances,
  activeInstanceId: initialInstances[0]?.id ?? '',
  setActiveInstance: (id) => set({ activeInstanceId: id }),
  createInstance: (name, status) =>
    set((state) => {
      const newInstance: Instance = {
        id: `inst-${Date.now()}`,
        name,
        status
      };

      return {
        instances: [...state.instances, newInstance],
        activeInstanceId: newInstance.id
      };
    }),
  renameInstance: (id, name) =>
    set((state) => ({
      instances: state.instances.map((instance) =>
        instance.id === id ? { ...instance, name } : instance
      )
    }))
}));
