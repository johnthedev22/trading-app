import { usePortfolio } from "../../hooks/usePortfolio"
const PortfolioUI = () => {
    const { state } = usePortfolio()
    return(
        <>
            <ul>
            {Object.entries(state).map(([ticker, orders]) => (
                <li key={ticker}>
                <h2>{ticker}</h2>

                {Object.entries(orders).map(([orderID, order]) => (
                    <div key={orderID}>
                    <h3>{order.title} (Order #{orderID})</h3>
                    <p>Price: ${order.stockPrice}</p>
                    <p>Shares: {order.stockQty}</p>
                    <p>Invested: ${order.orderPrice}</p>
                    </div>
                ))}
                </li>
            ))}
            </ul>

        </>
    )
}

export default PortfolioUI