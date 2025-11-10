
//Dumb component showing detailed stock data, along with chart "Period" buttons
import { useStock } from "../../hooks/useStock"


const StockItemMain = () => {
    const { state: data} = useStock()
    const {title, tickerSymbol: symbol} = data
    
    return (
        <div className="text-white">{title},{symbol}</div>
    )
}

export default StockItemMain