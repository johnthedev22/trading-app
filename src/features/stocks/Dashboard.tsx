import { useState, useEffect } from 'react'
import Account  from './Account'
import StockItems from './StockItems'
import StockItemMain from './StockItemMain'
import { useDevice } from '../../hooks/useDevice'
import useModal from '../../hooks/useModal'
import Modal from '../../components/modal/Modal'
import { getMultipleStocks } from "../../api/getMultipleStocks"
import initialStockData from '../../api/initialStockData'
import type { StockDataType, StockDataTypeMap } from "../../types/stockItem.types"

const borderColor  = "border-gray-500"

export default function Dashboard() {
    const { isMobile } = useDevice()
    const { isOpen, setIsOpen } = useModal(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [stockData, setStockData] = useState<StockDataTypeMap>({})
    const [stockItem, setStockItem] = useState<StockDataType>({
        title: "Apple",
        ticker: "AAPL"
    })
    
    useEffect(() => {
        getMultipleStocks(initialStockData)
            .then(setStockData)
            .finally(()=>setIsLoading(false))
            .catch(err => console.error("Failed to load stocks:", err))
    }, [])

    return !isMobile ? (
    <div className = {`overflow-y-auto max-h-[calc(100vh-100px)] grid grid-cols-[33%_66%] border ${borderColor} h-full m-10`}>                
        <div className = {`grid grid-rows-1 border-r ${borderColor} p-5`}>
            <Account/>
            <StockItems givenStockData = {initialStockData} 
                isMobile={isMobile} 
                updateDashboard = {(stock) => setStockItem({title: stock.title, ticker: stock.ticker})}
            />
        </div>
        <div className="p-5">
            {isLoading ? <div>Loading...</div> : <StockItemMain stock = {stockData[stockItem.ticker]} />}
        </div>
    </div>          
    )
    : (
    <div className={`grid grid-cols-1 border ${borderColor} h-full p-3`}>
        <Account/>
        <StockItems givenStockData = {initialStockData} 
                isMobile={isMobile} 
                updateDashboard = {(stock) => setStockItem({title: stock.title, ticker: stock.ticker})}
            />
        <Modal title="Stock details" isOpen={isOpen} onClose={()=>setIsOpen(false)} >
            {isLoading ? <div>Loading...</div> : <StockItemMain stock = {stockData[stockItem.ticker]} />}
        </Modal>        
    </div>
    )
}