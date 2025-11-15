import type { ChartDataPoint } from "./chartDataPoint.types"

export type OrderData = {
  orderID: number
  title: string
  ticker: string
  stockPrice: number 
  stockQty: number
  orderPrice: number
}

export type PortfolioState = {
    [ticker: string]: { // eg: "AAPL"
      [orderID: number]: OrderData
    };
};

export type StockDataType = {
  title: string
  ticker: string
  prevClose: number 
  close: number 
  chartData?: ChartDataPoint[]
}

export type StockDataTypeMap = Record<string, StockDataType>
