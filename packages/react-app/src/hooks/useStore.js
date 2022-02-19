import create from 'zustand';

export const useStore = create(set => ({
  provider: undefined,
  setProvider: provider => set(_state => provider),
  usdcBalance: '0',
  setUsdcBalance: usdcBalance => set(_state => usdcBalance),
  nrtBalance: '0',
  setNRTBalance: nrtBalance => set(_state => nrtBalance),
  frockBalance: '0',
  setFrockBalance: frockBalance => set(_state => frockBalance),
}));
