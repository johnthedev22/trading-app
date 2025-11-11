// src/api/getStockData.ts
const stockCache: Record<string, any> = {}

export async function getStockData(symbol: string) {
  // Normalize symbol (to avoid case mismatches)
  const key = symbol.toUpperCase()

  // ✅ 1. Return cached data if available
  if (stockCache[key]) {
    // console.log(`Cache hit for ${key}`)
    return stockCache[key]
  }

  // ✅ 2. Otherwise fetch it
  const res = await fetch(`/data/intra-${key}.json`)
  if (!res.ok) throw new Error(`Failed to load ${key} data`)
  const data = await res.json()

  // ✅ 3. Store in memory cache
  stockCache[key] = data

  return data
}
