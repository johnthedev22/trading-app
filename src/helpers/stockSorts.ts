// all array sorting functions concerning "stock" are stored here
import type { StockDataType } from "../types/stockItem.types"
import { checkDifference } from "./getPrices"

// Sorts the stock object by the root key (AAPL, NVDA etc...)
export const sortObjectByTicker = (sortAsc: boolean, dataToSort: Record<string, any>): Record<string, any> => {
  // First we change the object into an array via entries, then apply sort
  const sortedEntries = Object.entries(dataToSort).sort(([keyA], [keyB]) =>
    sortAsc ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA)
  )

  // Then we convert the array back to an object
  return Object.fromEntries(sortedEntries)
}

  // Sorts the stock object by the percDiff key
  export const sortObjectByDifference = (sortAsc: boolean, dataToSort: Record<string, any>): Record<string, any> => {
    // First we change the object into an array via entries, then apply sort
    const sortedEntries = Object.entries(dataToSort).sort(([, aData], [, bData]) => {
    const diffA = checkDifference(aData.close, aData.prevClose, true)?.percDifference ?? 0
    const diffB = checkDifference(bData.close, bData.prevClose, true)?.percDifference ?? 0

    // sortAsc = true → ascending (losers)
    // sortAsc = false → descending (winners)
    return sortAsc ? diffA - diffB : diffB - diffA
  })


  // Then we convert the array back to an object
  return Object.fromEntries(sortedEntries)
}

// Sorts the data of an array by ticker symbol
export const sortByString = (sortAsc: boolean, dataToSort: StockDataType[]): StockDataType[] => {
  const sortedItems: StockDataType[] = [...dataToSort].sort((a: any, b: any) =>
    sortAsc
      ? a.tickerSymbol.localeCompare(b.tickerSymbol)
      : b.tickerSymbol.localeCompare(a.tickerSymbol)
  )

  return sortedItems    
}

export const sortByDifference = (direction: 'winners' | 'losers', dataToSort: StockDataType[]): StockDataType[] => {
  const sortAsc = direction === 'winners' ? true : false

  const sortedItems = [...dataToSort].sort((a:any, b:any) => {
    const diffA = a.priceDifference ?? 0 //nullish coalescing operator 
    const diffB = b.priceDifference ?? 0 //If b.priceDifference is null or undefined, use 0 instead.
    return sortAsc ? diffB - diffA : diffA - diffB
  })

  return sortedItems

}