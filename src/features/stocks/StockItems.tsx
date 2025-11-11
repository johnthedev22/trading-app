import { useState, useEffect, lazy, Suspense } from "react"
import type { StockDataType } from "../../types/stockItem.types"
import { useStock } from "../../hooks/useStock"
import StockButtons from "../../components/button/StockButtons"
import { getMultipleStocks } from "../../api/getMultipleStocks"

type StockItemsProp = {
    isMobile: boolean
    openInMobile?: () => void
}

const StockItemSummary = lazy(()=>import('../../components/stocks/StockItemSummary'))

const initialStockData: StockDataType[] = [
    {
        title: "Apple",
        tickerSymbol: "AAPL"
    },
    {
        title: "BP",
        tickerSymbol: "BP"
    },
    {
        title: "IBM",
        tickerSymbol: "IBM"
    },
    {
        title: "Royal Dutch Shell",
        tickerSymbol: "SHEL"
    },
    {
        title: "Ford",
        tickerSymbol: "F"
    },
    {
        title: "Coca Cola",
        tickerSymbol: "KO"
    },
    {
        title: "Pepsi",
        tickerSymbol: "PEP"
    },
    {
        title: "Toyota",
        tickerSymbol: "TM"
    },
    {
        title: "Tesla",
        tickerSymbol: "TSLA"
    },
    {
        title: "Sony",
        tickerSymbol: "SONY"
    },
    {
        title: "NVIDIA",
        tickerSymbol: "NVDA"
    }
]

const StockItems = ({isMobile, openInMobile}: StockItemsProp) => {
    const [stockData, setStockData] = useState<StockDataType[]>([])

    useEffect(() => {
        const tickers: string[]  = initialStockData.map(item => item.tickerSymbol)

        getMultipleStocks(tickers)
            .then(setStockData)
            .catch(err => console.error("Failed to load stocks:", err))


    }, [])
    
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