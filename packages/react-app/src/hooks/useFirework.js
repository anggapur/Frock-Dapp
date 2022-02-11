import create from 'zustand';

export const useFirework = create(set => ({
  active: false,
  setActive: condition => set(() => ({ active: condition })),
}));
