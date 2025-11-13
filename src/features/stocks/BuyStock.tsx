import { useState } from "react"
import { useAccount } from "../../hooks/useAccount"
import StockIcon from "../../components/image/StockIcon"

type BuyStockProps = {
    ticker: string
    stockPrice: number
    arrow: string
    color: string
    difference: number
    percDifference: number
}
const BuyStock = ({
    ticker,
    stockPrice,
    arrow,
    color,
    difference,
    percDifference
}: BuyStockProps) => {
    const { state } = useAccount()
    const [purchaseAmount, setPurchaseAmount] = useState<number>(0)
    const [purchase, setPurchase] = useState<{
        noOfShares: number; availableFundsPerc: number; availableFunds:Number; buyAmount: number
    }>({ noOfShares: 0, availableFundsPerc: 100, availableFunds: state.cash, buyAmount: 0 })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const buyAmount:number = Number(e.target.value)
        const difference:number = Math.ceil(buyAmount / state.cash * 100)
        const noOfShares:number = buyAmount / stockPrice

        setPurchaseAmount(buyAmount)

        setPurchase({
            noOfShares: Number(noOfShares.toFixed(4)),
            availableFundsPerc: Number((100 - difference).toFixed(0)),
            buyAmount: buyAmount,
            availableFunds: state.cash - buyAmount
        })
    }
    return (
    <>
        <div className="grid grid-rows-2">
            <div className="grid grid-rows-2 grid-cols-2">
                <div className="grid grid-rows-2">
                    <div><h1 className="text-bold text-4xl">&pound;{stockPrice}</h1></div>
                    <div style={{color: color}}>{arrow}{difference} ({percDifference}%)</div>
                </div>
                <div className="justify-self-end"><StockIcon ticker = {ticker} doubleSize = {true}/></div>
            </div>
            <div className="grid grid-rows-2">
                <div className="grid grid-cols-2">
                    <div className="grid grid-rows-2">
                        <div><h1 className="text-bold text-4xl">{purchase.availableFundsPerc}%</h1></div>
                        <div>{purchase.noOfShares} of shares</div>
                        
                    </div>
                    <div>
                        <h1 className="text-bold text-4xl">&pound;{purchase.buyAmount}</h1>
                    </div>
                </div>
                <div>
                    <input
                        onChange = {handleOnChange}
                        id="volume"
                        type="range"
                        min="0"
                        max={state.cash * 1.5}
                        step="100"
                        value={purchaseAmount}
                        className="w-full h-1.25 bg-gray-100/25  range-lg md:range-sm appearance-none cursor-pointer accent-orange-500"
                    />
                </div>
            </div>
        </div>
    </>
    )
}

export default BuyStock