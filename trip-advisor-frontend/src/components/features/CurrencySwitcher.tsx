import { useCurrencyStore } from '@/stores/useCurrencyStore'
import { cn } from '@/lib/utils'

export function CurrencySwitcher({ className }: { className?: string }) {
  const { currency, toggleCurrency } = useCurrencyStore()

  return (
    <button
      onClick={toggleCurrency}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
        className
      )}
      aria-label="Toggle currency"
    >
      <span className="text-lg">{currency === 'USD' ? '🇺🇸' : '🇮🇩'}</span>
      <span>{currency}</span>
    </button>
  )
}