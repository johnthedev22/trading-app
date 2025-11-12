import type { StockDataType } from "../../types/stockItem.types"
import { chartPeriod } from "../../helpers/chartPeriod"

type StockItemProps = {
  stock: StockDataType
}

const StockItemMain = ({ stock }: StockItemProps) => {
  const { title, ticker, open, close } = stock

  // Example: const { doModulus, limit } = chartPeriod('1D', 15)

  return (
    <div className="text-white">
     {title}, {ticker}, {open}, {close}
    </div>
  )
}

export default StockItemMain
