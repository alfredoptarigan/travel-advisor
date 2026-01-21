import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CurrencyState {
  currency: 'USD' | 'IDR'
  toggleCurrency: () => void
  setCurrency: (currency: 'USD' | 'IDR') => void
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: 'IDR',
      toggleCurrency: () =>
        set((state) => ({ currency: state.currency === 'USD' ? 'IDR' : 'USD' })),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'currency-storage',
    },
  ),
)