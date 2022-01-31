import create from 'zustand'

export const useStore = create(set => ({
  provider: undefined,
  setProvider: provider => set(state => provider),
}))
