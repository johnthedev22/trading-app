// all array sorting functions concerning "stock" are stored here
import type { StockDataType } from "../types/stockItem.types";

export const sortByString = (sortAsc: boolean, dataToSort: StockDataType[]): StockDataType[] => {
    const sortedItems: StockDataType[] = [...dataToSort].sort((a: any, b: any) =>
      sortAsc
        ? a.tickerSymbol.localeCompare(b.tickerSymbol)
        : b.tickerSymbol.localeCompare(a.tickerSymbol)
    );

    return sortedItems    
}

export const sortByDifference = (direction: 'winners' | 'losers', dataToSort: StockDataType[]): StockDataType[] => {
  const sortAsc = direction === 'winners' ? true : false

  const sortedItems = [...dataToSort].sort((a:any, b:any) => {
    const diffA = a.priceDifference ?? 0; //nullish coalescing operator 
    const diffB = b.priceDifference ?? 0; //If b.priceDifference is null or undefined, use 0 instead.
    return sortAsc ? diffB - diffA : diffA - diffB;
  })

  return sortedItems

}