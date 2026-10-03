import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Symbols ──────────────────────────────────────────────────────────────────
const SYMBOLS: Record<string, string> = {
  AED: 'AED',
  USD: '$',
  EUR: '€',
  GBP: '£',
  SAR: 'SAR',
};

// ── Fallback hardcoded rates (AED base = 1) ──────────────────────────────────
// AED is pegged to USD at 3.6725. Other rates are approximate.
const FALLBACK_RATES: Record<string, number> = {
  AED: 1,
  USD: 0.2723,  // fixed peg: 1 AED = 1/3.6725 USD
  EUR: 0.2512,
  GBP: 0.2145,
  SAR: 1.0213,
};

// ── In-memory cache ──────────────────────────────────────────────────────────
const CACHE_KEY = 'bvh_fx_rates';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface CachedRates {
  rates: Record<string, number>;
  fetchedAt: number;
}

function loadCachedRates(): Record<string, number> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: CachedRates = JSON.parse(raw);
    const age = Date.now() - parsed.fetchedAt;
    if (age < CACHE_TTL_MS) return parsed.rates;
    return null; // stale
  } catch {
    return null;
  }
}

function saveCachedRates(rates: Record<string, number>) {
  try {
    const payload: CachedRates = { rates, fetchedAt: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage might be full — ignore
  }
}

// ── Live rates (module-level promise so we only fetch once per page load) ────
let ratesPromise: Promise<Record<string, number>> | null = null;

async function fetchLiveRates(): Promise<Record<string, number>> {
  // 1. Check in-memory promise (already fetching this session)
  if (ratesPromise) return ratesPromise;

  // 2. Check localStorage cache (fresh within 1 hour)
  const cached = loadCachedRates();
  if (cached) {
    // Wrap in resolved promise for consistent API
    ratesPromise = Promise.resolve(cached);
    return cached;
  }

  // 3. Fetch from frankfurter.app (ECB rates, updated daily, free, no key needed)
  //    Base = AED, so 1 AED → X of each currency
  ratesPromise = (async () => {
    try {
      const currencies = 'USD,EUR,GBP,SAR';
      const res = await fetch(
        `https://api.frankfurter.app/latest?from=AED&to=${currencies}`,
        { signal: AbortSignal.timeout(4000) }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json() as { rates: Record<string, number> };

      const rates: Record<string, number> = {
        AED: 1,
        ...data.rates,
      };

      saveCachedRates(rates);
      console.log('[Biazo FX] Live rates loaded:', rates);
      return rates;
    } catch (err) {
      console.warn('[Biazo FX] Could not fetch live rates, using fallback.', err);
      return FALLBACK_RATES;
    }
  })();

  return ratesPromise;
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Eagerly start fetching rates in background — but only when browser is idle,
 *  so it never competes with rendering or user interactions. */
if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(() => fetchLiveRates(), { timeout: 5000 });
} else {
  // Safari fallback
  setTimeout(() => fetchLiveRates(), 100);
}

/** Format an AED amount into the target currency string synchronously.
 *  Uses cached rates if available, otherwise falls back to hardcoded rates. */
export function formatPrice(amountAed: number, targetCurrency: string = 'AED'): string {
  // Try cached rates first (sync), fall back to hardcoded
  const cached = loadCachedRates();
  const rates = cached ?? FALLBACK_RATES;
  const rate = rates[targetCurrency] ?? FALLBACK_RATES[targetCurrency] ?? 1;
  const symbol = SYMBOLS[targetCurrency] ?? targetCurrency;

  const converted = Math.round(amountAed * rate);
  return `${symbol} ${converted.toLocaleString()}`;
}

/** Async version — waits for live rates to load before formatting.
 *  Use this when accuracy matters and a brief await is acceptable. */
export async function formatPriceLive(amountAed: number, targetCurrency: string = 'AED'): Promise<string> {
  const rates = await fetchLiveRates();
  const rate = rates[targetCurrency] ?? FALLBACK_RATES[targetCurrency] ?? 1;
  const symbol = SYMBOLS[targetCurrency] ?? targetCurrency;

  const converted = Math.round(amountAed * rate);
  return `${symbol} ${converted.toLocaleString()}`;
}

/** Returns true if live rates are loaded and fresh */
export function ratesAreLive(): boolean {
  return loadCachedRates() !== null;
}
