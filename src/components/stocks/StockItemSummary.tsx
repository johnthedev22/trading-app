//Dumb component for the stock summaries. Really its a card.

import type { StockDataType } from "../../types/stockItem.types"

type StockItemSummaryProp = {
    data: StockDataType
}

const StockItemSummary = ({data}: StockItemSummaryProp) => {
    const {title, ticker: symbol} = data
    return (
        <div className="grid grid-cols-3 grid-rows-2">
            <div>img here</div>
            <div className="grid grid-rows-2">
                <div>{title}</div>
                <div>{symbol}</div>
            </div>
            <div>
                Price here
            </div>
            <div className="grid col-span-3">
                Chart here
            </div>
        </div>
        
    )
}

export default StockItemSummary