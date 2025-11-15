import { useState, useEffect, useCallback } from "react"
import { useDevice } from "../../hooks/useDevice"
import { useTheme } from "../../hooks/useTheme"
import Account from "./Account"
import StockItems from "./StockItems"
import StockItemMain from "./StockItemMain"
import useModal from "../../hooks/useModal"
import Modal from "../../components/modal/Modal"
import { getMultipleStocks } from "../../api/getMultipleStocks"
import initialStockData from "../../api/initialStockData"
import type { StockDataType, StockDataTypeMap } from "../../types/stockItem.types"

const borderColor = "border-gray-500"

export default function Dashboard() {
  const { isMobile } = useDevice()
  const { isOpen, setIsOpen } = useModal(false)
  const { state: themeState } = useTheme()

  const [isLoading, setIsLoading] = useState(true)
  const [stockData, setStockData] = useState<StockDataTypeMap>({})
  const [selectedStock, setSelectedStock] = useState<StockDataType>({
    title: "Apple",
    ticker: "AAPL",
    prevClose: 0,
    close: 0,
  })

  /** Fetch stock data on mount */
  useEffect(() => {
    getMultipleStocks(initialStockData)
      .then(setStockData)
      .catch(err => console.error("Failed to load stocks:", err))
      .finally(() => setIsLoading(false))
  }, [])

  /** Stable callback (prevents re-renders in children) */
  const updateDashboard = useCallback((stock: StockDataType) => {
    setSelectedStock({
      title: stock.title,
      ticker: stock.ticker,
      prevClose: 0,
      close: 0,
    })
  }, [])

  /** Shared content renderer */
  const renderStockList = (
    <StockItems
      givenStockData={stockData}
      isMobile={isMobile}
      theme={themeState.theme}
      updateDashboard={updateDashboard}
      // Spread the key value pairs using the "conditional prop spread"
      {...(isMobile && { openInMobile: () => setIsOpen(true) })}
    />
  )

  const renderStockMain = (
    <StockItemMain stock={stockData[selectedStock.ticker]} />
  )

  if (isMobile) {
    return (
      <div className={`overflow-y-auto max-h-[calc(100vh-100px)] grid grid-cols-1 border ${borderColor} h-full p-3`}>
        <Account />

        {isLoading ? <div>Loading...</div> : renderStockList}

        <Modal title="Stock details" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {isLoading ? <div>Loading...</div> : renderStockMain}
        </Modal>
      </div>
    )
  }

  return (
    <div className={`overflow-y-auto max-h-[calc(100vh-100px)] grid grid-cols-[33%_66%] border ${borderColor} h-full m-10`}>
      <div className={`grid grid-rows-1 border-r ${borderColor} p-5`}>
        <Account />
        {isLoading ? <div>Loading...</div> : renderStockList}
      </div>

      <div className="p-5">
        {isLoading ? <div>Loading...</div> : renderStockMain}
      </div>
    </div>
  )
}
