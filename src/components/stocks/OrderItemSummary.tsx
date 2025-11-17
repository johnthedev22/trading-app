//Dumb component for the stock summaries. Really its a card.

import type { OrderData } from "../../types/stockItem.types"
import StockIcon from "../image/StockIcon"
import { formatCurrency } from "../../helpers/formatCurrency"
import type { Action } from "../../types/account.types"
import type { Action as PortfolioAction } from "../../types/portfolioAction.types"

type StockItemSummaryProp = {
    data: OrderData
    accountDispatch: React.Dispatch<Action>
    portfolioDispatch: React.Dispatch<PortfolioAction>
}

const OrderItemSummary = ({data, accountDispatch, portfolioDispatch}: StockItemSummaryProp) => {
    const {title, ticker: symbol, stockPrice, stockQty, orderPrice, orderID} = data

    const handleSell = () => {
        portfolioDispatch({type: "REMOVE_STOCK", payload: data})
        accountDispatch({type:"SELL", amount: orderPrice})
    }
    
    return (
        <div className="grid grid-cols-[20%_1fr_1fr_1fr] grid-rows-2">
            <div><StockIcon ticker={symbol} /> {title}</div>
            <div className="grid grid-rows-2">
                <div> {formatCurrency({amount:stockPrice})}</div>
                <div className="text-xs text-gray-400">{stockQty}</div>
            </div>
            <div className="text-right">
                <div>
                    Order #:{orderID}
                </div>
                <div className="text-xs">
                    {formatCurrency({amount:orderPrice})}
                </div>
            </div>
            <div className="flex items-center justify-self-end">
                <button
                    onClick={handleSell}
                    className={`hover:cursor-pointer hover:bg-blue-600 bg-blue-500 w-full md:w-auto font-bold px-4 py-2 text-white rounded-full mt-2`}
                    >
                       Sell
                    </button>
            </div>
        </div>
        
    )
}

export default OrderItemSummary