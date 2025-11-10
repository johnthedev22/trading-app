import Dashboard from "../features/stocks/Dashboard"
import { StockProvider } from "../context/StockContext"

const TradingApp = () => {
    return <StockProvider><Dashboard/></StockProvider>
}

export default TradingApp