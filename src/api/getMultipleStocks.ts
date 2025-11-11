import { getStockData } from "./getStockData"
import type { StockDataType } from "../types/stockItem.types"

export async function getMultipleStocks(stockInfo: StockDataType[]) {
  const promises = stockInfo.map(item => getStockData(item.tickerSymbol))
  const results = await Promise.all(promises)

  return stockInfo.map((item, i) => {
    return {
    title: item.title,
    tickerSymbol: item.tickerSymbol,
    data: results[i],
  }})
}
