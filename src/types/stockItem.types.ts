import type { ChartDataPoint } from "./chartDataPoint.types"

export type PortfolioState = {
    [ticker: string]: { // eg: "AAPL"
        title: string
        ticker: string
        stockPrice: number 
        stockQty: number
        orderPrice: number
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
