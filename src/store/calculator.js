import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export const useCalculatorStore = create(
  subscribeWithSelector(set => ({
    ftmPrice: 2,
    dailyVolume: 50000,
    precentClaimPeriod: 100,
    precentReflection: 7,
    precentTreasury: 14,
    frocPrice: 0.094,
    yourEntryPrice: 0.1,
    precentYourPortfolio: 1,
    precentCompound: 67,
    precentReturn: 33,
    precentMarketingWallet: 10,
    days: 150,
    strongPrice: 500,
    strongReturn: 0.09,
    nodesCount: 20,
    setFtmPrice: value => set({ ftmPrice: Number(value) }),
    setDailyVolume: value => set({ dailyVolume: Number(value) }),
    setPrecentClaimPeriod: value => set({ precentClaimPeriod: Number(value) }),
    setPrecentReflection: value =>
      set({
        precentReflection: Number(value),
        precentTreasury: Number(21 - value),
      }),
    setPrecentTreasury: value =>
      set({
        precentTreasury: Number(value),
        precentReflection: Number(21 - value),
      }),
    setFrocPrice: value => set({ frocPrice: Number(value) }),
    setYourEntryPrice: value => set({ yourEntryPrice: Number(value) }),
    setPrecentYourPortfolio: value =>
      set({ precentYourPortfolio: Number(value) }),
    setPrecentCompound: value =>
      set({
        precentCompound: Number(value),
        precentReturn: Number(100 - value),
      }),
    setPrecentReturn: value =>
      set({
        precentReturn: Number(value),
        precentCompound: Number(100 - value),
      }),
    setPrecentMarketingWallet: value =>
      set({ precentMarketingWallet: Number(value) }),
    setDays: value => set({ days: Number(value) }),
    setStrongPrice: value => set({ strongPrice: Number(value) }),
    setStrongReturn: value => set({ strongReturn: Number(value) }),
    setNodesCount: value => set({ nodesCount: Number(value) }),
  }))
)
