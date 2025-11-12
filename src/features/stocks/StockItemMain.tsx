import type { StockDataType } from "../../types/stockItem.types"

type StockItemProps = {
  stock: StockDataType
}

const StockItemMain = ({ stock }: StockItemProps) => {
  const { title, ticker, open, close } = stock

  return (
    <div className="text-white">
     {title}, {ticker}, {open}, {close}
    </div>
  )
}

export default StockItemMain
