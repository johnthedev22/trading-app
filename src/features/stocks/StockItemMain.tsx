import type { StockDataType } from "../../types/stockItem.types"
import { checkDifference } from "../../helpers/getPrices"
import StockIcon from "../../components/image/StockIcon"

type StockItemProps = {
  stock: StockDataType
}

const StockItemMain = ({ stock }: StockItemProps) => {
  const { title, ticker, prevClose, close } = stock
  const {arrow, color, percDifference, difference } = checkDifference(close, prevClose)

  return (
  <div className="sticky top-0 text-white">
    <div className="grid grid-cols-[50px_1fr]">
      <div><StockIcon ticker={ticker}/></div>
      <div className="grid grid-rows-2 text-left">
        <div>{ticker}</div>
        <div>{title}</div>
      </div>
    </div>
    <div className="mt-5 grid grid-rows-2">
        <div>&pound;{close}</div>
        <div style={{color:color}}>{difference} {arrow} ({percDifference}%)</div>
      </div>
  </div>
  )
}

export default StockItemMain
