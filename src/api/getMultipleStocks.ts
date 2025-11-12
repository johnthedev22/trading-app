import { getStockData } from "./getStockData"
import type { StockDataType, StockDataTypeMap } from "../types/stockItem.types"
import { getClosePrices } from "../helpers/getPrices"

export async function getMultipleStocks(stockInfo: StockDataType[]) {
  const promises = stockInfo.map(item => getStockData(item.ticker))
  const results = await Promise.all(promises)

  const stock: StockDataTypeMap = {} // Declare an empty object as a constant reference use a Map ts type

  stockInfo.map((item, i) => {

    stock[item.ticker] = { 
        title: item.title, 
        ticker: item.ticker, 
        ...getClosePrices(results[i]),
        chartData: results[i]
    }
        
    return {
      stock
    }})

    return stock
  }
