//Dumb component for the stock summaries. Really its a card.

import type { StockDataType } from "../../types/stockItem.types"
import { checkDifference } from "../../helpers/getPrices"

type StockItemSummaryProp = {
    data: StockDataType
}

const StockItemSummary = ({data}: StockItemSummaryProp) => {
    const {title, ticker: symbol, close, prevClose} = data
    const { color, percDifference, arrow } = checkDifference(Number(close), Number(prevClose))
    
    return (
        <div className="grid grid-cols-3 grid-rows-2">
            <div>img here</div>
            <div className="grid grid-rows-2">
                <div>{title}</div>
                <div className="text-xs text-gray-400">{symbol}</div>
            </div>
            <div className="text-right">
                <div>
                    {close}
                </div>
                <div className="text-xs" style={{color: color}}>
                    {arrow}
                    {percDifference}%
                </div>
            </div>
            <div className="grid col-span-3">
                Chart here
            </div>
        </div>
        
    )
}

export default StockItemSummary