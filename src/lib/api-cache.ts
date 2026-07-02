/** Lightweight frontend cache with in-memory + localStorage layer. */

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const CACHE_KEYS = {
  COMPANIES: "cache:platform:companies",
  INVOICES_TABLE: "cache:platform:invoices-table",
  PACKAGES: "cache:platform:packages",
  SUBSCRIPTION_STATS: "cache:platform:subscription-stats",
} as const;

// Clean up stale keys from earlier versions
try { localStorage.removeItem("cache:platform:invoices"); } catch { /* ignore */ }

type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};

function now(): number {
  return Date.now();
}

function readLocal<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry<T>;
  } catch {
    return null;
  }
}

function writeLocal<T>(key: string, entry: CacheEntry<T>): void {
  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

/** In-memory store (survives page navigations within the same SPA visit). */
const memStore = new Map<string, CacheEntry<unknown>>();

/**
 * Get cached data for a key. Returns `null` if expired or missing.
 */
export function cacheGet<T>(key: string): T | null {
  // 1. Check memory
  const mem = memStore.get(key) as CacheEntry<T> | undefined;
  if (mem && mem.expiresAt > now()) {
    return mem.data;
  }
  if (mem) {
    memStore.delete(key);
  }

  // 2. Check localStorage (survives hard refresh)
  const local = readLocal<T>(key);
  if (local && local.expiresAt > now()) {
    // Promote back to memory
    memStore.set(key, local);
    return local.data;
  }

  return null;
}

/**
 * Store data in cache (both memory + localStorage).
 */
export function cacheSet<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = { data, expiresAt: now() + CACHE_TTL_MS };
  memStore.set(key, entry);
  writeLocal(key, entry);
}

/**
 * Clear a specific cache entry.
 */
export function cacheClear(key: string): void {
  memStore.delete(key);
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
