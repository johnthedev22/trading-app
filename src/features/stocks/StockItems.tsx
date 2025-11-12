import { useState, useEffect, lazy, Suspense } from "react"
import type { StockDataType } from "../../types/stockItem.types"
import StockButtons from "../../components/button/StockButtons"

type StockItemsProp = {
    givenStockData: StockDataType[]
    isMobile: boolean
    updateDashboard: (stock: StockDataType) => void
    openInMobile?: () => void
}

const StockItemSummary = lazy(()=>import('../../components/stocks/StockItemSummary'))

const StockItems = ({givenStockData, isMobile, openInMobile, updateDashboard}: StockItemsProp) => {
    const [stockData, setStockData] = useState<StockDataType[]>([])
    useEffect(()=>{
        setStockData(givenStockData)
    //givenStockData wont be available on the first render, so trigger useEffect on its change
    },[givenStockData])

    const handleMainChange = (stock: StockDataType) => {
        //setCurrentStock({...stock})
        updateDashboard(stock)
        if(isMobile && typeof openInMobile === "function") openInMobile()
    }

    const handleSortChange = (sortedData: StockDataType[]) => {
        setStockData([...sortedData]) //shallow copy: React sees it as a new array reference, guaranteeing a re-render
    }

    return (
        <>
            <div className="sticky top-0 bg-black z-10 mt-3 border-b border-gray-500"><StockButtons returnSortedData={handleSortChange} stockData={stockData}/></div>
           
                {
                stockData.map((item)=> {
                    return (
                    <Suspense key={`summary_loading_${item.ticker}`} fallback={<div>Loading...</div>}>
                        <div onClick={()=>handleMainChange(item)} className="grid grid-rows hover:cursor-pointer">
                            <StockItemSummary data={item}/>
                        </div>
                    </Suspense>
                    )
                })
                }
        </>
    )
}

export default StockItems