import { useState, lazy, Suspense } from "react"
import type { StockDataType, StockDataTypeMap } from "../../types/stockItem.types"
import StockButtons from "../../components/button/StockButtons"

type StockItemsProp = {
    givenStockData: StockDataTypeMap
    isMobile: boolean
    theme: string
    updateDashboard: (stock: StockDataType) => void
    openInMobile?: () => void
}

const StockItemSummary = lazy(()=>import('../../components/stocks/StockItemSummary'))

const StockItems = ({givenStockData, isMobile, theme, openInMobile, updateDashboard}: StockItemsProp) => {
    const [stockData, setStockData] = useState<StockDataTypeMap>(givenStockData)
    
    const handleMainChange = (stock: StockDataType) => {
        //setCurrentStock({...stock})
        updateDashboard(stock)
        if(isMobile && typeof openInMobile === "function") openInMobile()
    }

    const handleSortChange = (sortedData: StockDataTypeMap) => {
        // Applicable to arrays only
        //setStockData([...sortedData]) //shallow copy: React sees it as a new array reference, guaranteeing a re-render

        setStockData(sortedData)
    }
    const isDark: boolean = theme.length === 0
    const parentClass: string = isDark ? 'bg-white' : 'bg-black'
    const rowHighlightClass: string = isDark ? 'bg-gray-100' : 'bg-gray-900'
    
    return (
        <>
        <div className={`sticky top-0 ${parentClass} z-10 mt-3 border-b border-gray-500`}><StockButtons theme = {theme} stockData = {stockData} returnSortedData = {handleSortChange}/></div>
        {
            Object.keys(stockData).map(key => (
                <Suspense key={`summary_loading_${key}`} fallback={<div>Loading...</div>}>
                    <div onClick={()=>handleMainChange(stockData[key])} className={`grid grid-rows hover:cursor-pointer dark: hover:${rowHighlightClass}`}>
                        <StockItemSummary data={stockData[key]}/>
                    </div>
                </Suspense>
            ))
        }
        </>
        )
}

export default StockItems