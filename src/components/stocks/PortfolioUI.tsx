import OrderItemSummary from "./OrderItemSummary"
import type { Action } from "../../types/account.types"
import type { PortfolioState } from "../../types/stockItem.types"
import type { Action as PortfolioAction } from "../../types/portfolioAction.types"

type PortfolioProps = {
    portfolioData: PortfolioState
    portfolioDispatch: React.Dispatch<PortfolioAction>
    accountDispatch: React.Dispatch<Action>
}

const PortfolioUI = ({ portfolioData, portfolioDispatch, accountDispatch }: PortfolioProps ) => {
    return(
    <>
    {Object.entries(portfolioData).map(([ticker, orders]) => (
        <>{Object.entries(orders).map(([orderID, order]) => (
            <OrderItemSummary key={`${ticker}_${orderID}`} data={order} accountDispatch={accountDispatch} portfolioDispatch={portfolioDispatch} />
        ))}
        </>
        
    ))}
    </>
    )
}

export default PortfolioUI