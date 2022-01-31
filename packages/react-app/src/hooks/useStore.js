import create from 'zustand'

export const useStore = create(set => ({
  provider: undefined,
  setProvider: () => set(state => ({ provider: state.provider })),
}))
