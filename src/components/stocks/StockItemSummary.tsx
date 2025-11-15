//Dumb component for the stock summaries. Really its a card.

import type { StockDataType } from "../../types/stockItem.types"
import { checkDifference } from "../../helpers/getPrices"
import StockIcon from "../image/StockIcon"
import { formatCurrency } from "../../helpers/formatCurrency"

type StockItemSummaryProp = {
    data: StockDataType
}

const StockItemSummary = ({data}: StockItemSummaryProp) => {
    const {title, ticker: symbol, close, prevClose} = data
    const { color, percDifference, arrow, difference } = checkDifference(Number(close), Number(prevClose))
    
    return (
        <div className="grid grid-cols-3 grid-rows-2">
            <div><StockIcon ticker={symbol} /></div>
            <div className="grid grid-rows-2">
                <div>{title}</div>
                <div className="text-xs text-gray-400">{symbol}</div>
            </div>
            <div className="text-right">
                <div>
                     {formatCurrency({amount: close})}
                </div>
                <div className="text-xs" style={{color: color}}>
                    {arrow}{difference} ({percDifference}%)
                </div>
            </div>
            <div className="grid col-span-3">
                Chart here
            </div>
        </div>
        
    )
}

export default StockItemSummary