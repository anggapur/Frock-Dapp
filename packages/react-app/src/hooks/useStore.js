import create from 'zustand';

export const useStore = create(set => ({
  provider: undefined,
  setProvider: provider => set(_state => provider),
}));
