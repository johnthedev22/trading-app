import Account  from './Account'
import StockItems from './StockItems'
import StockItemMain from '../../components/stocks/StockItemMain'
import { initialStockData } from "../../api/getStockData"
import { useDevice } from '../../hooks/useDevice'
import useModal from '../../hooks/useModal'
import Modal from '../../components/modal/Modal'

const borderColor  = "border-gray-500"

export default function Dashboard() {
    const { isMobile } = useDevice()
    const { isOpen, setIsOpen } = useModal(false)

    return !isMobile ? (
    <div className={`grid grid-cols-[33%_66%] border ${borderColor} h-full m-10`}>                
        <div className={`grid grid-rows-1 border-r ${borderColor} p-5`}>
            <Account/>
            <StockItems passedStockData={initialStockData} isMobile={isMobile}/>
        </div>
        <div className="p-5">
            <StockItemMain />
        </div>
    </div>          
    )
    : (
    <div className={`grid grid-cols-1 border ${borderColor} h-full p-3`}>
        <Account/>
        <StockItems passedStockData={initialStockData} isMobile={isMobile} openInMobile={()=>setIsOpen(true)}/>
        <Modal title="Stock details" isOpen={isOpen} onClose={()=>setIsOpen(false)} >
            <StockItemMain />
        </Modal>        
    </div>
    )
}