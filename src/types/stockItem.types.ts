import type { ChartDataPoint } from "./chartDataPoint.types"

export type StockDataType = {
  title: string
  ticker: string
  prevClose: number 
  close: number 
  chartData?: ChartDataPoint[]
}

export type StockDataTypeMap = Record<string, StockDataType>
