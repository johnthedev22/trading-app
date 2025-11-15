import type { StockDataType } from "../../types/stockItem.types"
import { checkDifference } from "../../helpers/getPrices"
import StockIcon from "../../components/image/StockIcon"
import Modal from "../../components/modal/Modal"
import { useState } from "react"
import BuyStock from "./BuyStock"
import { formatCurrency } from "../../helpers/formatCurrency"

type StockItemProps = {
  stock: StockDataType
}

const StockItemMain = ({ stock }: StockItemProps) => {
  const { title, ticker, prevClose, close } = stock
  const {arrow, color, percDifference, difference } = checkDifference(close, prevClose)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
  <div className="sticky top-0 ">
    <div className="grid grid-cols-[50px_1fr]">
      <div><StockIcon ticker={ticker}/></div>
      <div className="grid grid-rows-2 text-left">
        <div>{ticker}</div>
        <div>{title}</div>
      </div>
    </div>
    <div className="mt-5 grid grid-rows-3">
      <div><h1 className="text-bold text-6xl">{formatCurrency({amount: close})}</h1></div>
      <div style={{color:color}}>{difference} {arrow} ({percDifference}%)</div>
      <div>
        <button
        onClick={()=>setIsOpen(true)}
        className="hover:cursor-pointer w-full md:w-auto font-bold px-4 py-2 text-white bg-blue-500 rounded-full w-auto mt-2 hover:bg-blue-600"
        >
            Buy
        </button>
      </div>
    </div>
    <Modal title = {`Buy ${title}`} isOpen = {isOpen} onClose = { ()=>setIsOpen(false)}>
      <BuyStock 
        title={title}
        ticker = {stock.ticker}
        stockPrice = {close}
        arrow= {arrow}
        color = {color}
        difference = {difference}
        percDifference = {percDifference}
        closeOnBuy={()=>setIsOpen(false)}
        />
    </Modal>
      
    
  </div>
  
  )
}

export default StockItemMain
