import { useState, useEffect } from 'react'
import Account  from './Account'
import StockItems from './StockItems'
import StockItemMain from './StockItemMain'
import { useDevice } from '../../hooks/useDevice'
import useModal from '../../hooks/useModal'
import Modal from '../../components/modal/Modal'
import { getMultipleStocks } from "../../api/getMultipleStocks"
import initialStockData from '../../api/initialStockData'
import type { StockDataType } from "../../types/stockItem.types"

const borderColor  = "border-gray-500"

export default function Dashboard() {
    const { isMobile } = useDevice()
    const { isOpen, setIsOpen } = useModal(false)
    const [stockData, setStockData] = useState<StockDataType[]>([])
    
    useEffect(() => {
        getMultipleStocks(initialStockData)
            .then(setStockData)
            .catch(err => console.error("Failed to load stocks:", err))
    }, [])

    return !isMobile ? (
    <div className={`grid grid-cols-[33%_66%] border ${borderColor} h-full m-10`}>                
        <div className={`grid grid-rows-1 border-r ${borderColor} p-5`}>
            <Account/>
            <StockItems givenStockData={stockData} isMobile={isMobile}/>
        </div>
        <div className="p-5">
            <StockItemMain allStockData={stockData} />
        </div>
    </div>          
    )
    : (
    <div className={`grid grid-cols-1 border ${borderColor} h-full p-3`}>
        <Account/>
        <StockItems givenStockData={stockData} isMobile={isMobile} openInMobile={()=>setIsOpen(true)}/>
        <Modal title="Stock details" isOpen={isOpen} onClose={()=>setIsOpen(false)} >
            <StockItemMain allStockData={stockData}/>
        </Modal>        
    </div>
    )
}