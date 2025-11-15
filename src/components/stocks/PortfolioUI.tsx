import { usePortfolio } from "../../hooks/usePortfolio"
const PortfolioUI = () => {
    const { state } = usePortfolio()
    return(
        <>
            <ul>
               {Object.entries(state).map(([ticker, stock]) => (
  <div key={ticker}>
    <h3>{stock.title} ({stock.ticker})</h3>
    <p>Price: ${stock.stockPrice}</p>
    <p>Shares: {stock.stockQty}</p>
    <p>Invested: ${stock.orderPrice}</p>
  </div>
))}
            </ul>
        </>
    )
}

export default PortfolioUI