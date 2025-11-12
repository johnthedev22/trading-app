import type { StockDataType } from "../../types/stockItem.types"
import { checkDifference } from "../../helpers/getPrices"

type StockItemProps = {
  stock: StockDataType
}

const StockItemMain = ({ stock }: StockItemProps) => {
  const { title, ticker, prevClose, close } = stock
  const {arrow, color, percDifference, difference } = checkDifference(close, prevClose)

  return (
    <div className="text-white">
     {title}, {ticker}, {close}
     <div style={{color: color}}>{arrow} {difference} ({percDifference}%)</div>
    </div>
  )
}

export default StockItemMain
