import { useState, lazy, Suspense } from "react"
import type { StockDataType } from "../../types/stockItem.types"
import { useStock } from "../../hooks/useStock"
import StockButtons from "../../components/button/StockButtons"

type StockItemsProp = {
    passedStockData: StockDataType[]
    isMobile: boolean
    openInMobile?: () => void
}

const StockItemSummary = lazy(()=>import('../../components/stocks/StockItemSummary'))

const StockItems = ({passedStockData, isMobile, openInMobile}: StockItemsProp) => {
    const [stockData, setStockData] = useState<StockDataType[]>(passedStockData)
    
    const { dispatch } = useStock()

    const handleMainChange = (stock: StockDataType) => {
        //setCurrentStock({...stock})
        dispatch({type:"SET", title: stock.title, tickerSymbol: stock.tickerSymbol})

        if(isMobile && typeof openInMobile === "function") openInMobile()
    }

    const handleSortChange = (sortedData: StockDataType[]) => {
        setStockData([...sortedData]) //shallow copy: React sees it as a new array reference, guaranteeing a re-render
    }

    return (
        <>
            <div className="mt-3"><StockButtons returnSortedData={handleSortChange} stockData={stockData}/></div>
           
                {
                stockData.map((item)=> {
                    return (
                    <Suspense key={`summary_loading_${item.tickerSymbol}`} fallback={<div>Loading...</div>}>
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