import { getStockData } from "./getStockData"

export async function getMultipleStocks(symbols: string[]) {
  const promises = symbols.map(symbol => getStockData(symbol))
  const results = await Promise.all(promises)

  return symbols.map((symbol, i) => ({
    symbol,
    data: results[i],
  }))
}
