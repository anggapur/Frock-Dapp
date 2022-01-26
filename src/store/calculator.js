import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export const useCalculatorStore = create(
  subscribeWithSelector(set => ({
    ftmPrice: 2,
    dailyVolume: 10000,
    precentClaimPeriod: 100,
    precentReflection: 7,
    precentTreasury: 14,
    frocPrice: 0.00394,
    precentYourPortfolio: 1,
    precentCompound: 67,
    precentReturn: 33,
    precentMarketingWallet: 10,
    days: 150,
    strongPrice: 500,
    precentStrongReturn: 9,
    nodesCount: 20,
    setFtmPrice: value => set({ ftmPrice: Number(value) }),
    setDailyVolume: value => set({ dailyVolume: Number(value) }),
    setPrecentClaimPeriod: value => set({ precentClaimPeriod: Number(value) }),
    setPrecentReflection: value => set({ precentReflection: Number(value) }),
    setPrecentTreasury: value => set({ precentTreasury: Number(value) }),
    setFrocPrice: value => set({ frocPrice: Number(value) }),
    setPrecentYourPortfolio: value =>
      set({ precentYourPortfolio: Number(value) }),
    setPrecentCompound: value => set({ precentCompound: Number(value) }),
    setPrecentReturn: value => set({ precentReturn: Number(value) }),
    setPrecentMarketingWallet: value =>
      set({ precentMarketingWallet: Number(value) }),
    setDays: value => set({ days: Number(value) }),
    setStrongPrice: value => set({ strongPrice: Number(value) }),
    setPrecentStrongReturn: value =>
      set({ precentStrongReturn: Number(value) }),
    setNodesCount: value => set({ nodesCount: Number(value) }),
  }))
)
