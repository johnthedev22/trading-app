import type { ChartDataPoint } from "./chartDataPoint.types"

export type StockDataType = {
  title: string
  ticker: string
  open?: number | string
  close?: number | string
  chartData?: ChartDataPoint[]
}

export type StockDataTypeMap = Record<string, StockDataType>
