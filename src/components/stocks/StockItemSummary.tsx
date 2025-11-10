//Dumb component for the stock summaries. Really its a card.

import type { StockDataType } from "../../types/stockItem.types"

type StockItemSummaryProp = {
    data: StockDataType
}

const StockItemSummary = ({data}: StockItemSummaryProp) => {
    const {title, tickerSymbol: symbol} = data
    return (
        <div className="grid grid-cols-4">
            <div>img here</div>
            <div className="grid-rows-2">
                <div>{title}</div>
                <div>{symbol}</div>
            </div>
            <div>
                Chart here
            </div>
            <div>
                Price here
            </div>
        </div>
        
    )
}

export default StockItemSummary