import { useState, useEffect } from "react"
import { useAccount } from "../../hooks/useAccount"
import StockIcon from "../../components/image/StockIcon"
import Doughnut from "../../components/stocks/Doughnut"

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
    const [purchase, setPurchase] = useState<{[key: string]: number}>({ 
        noOfShares: 0, availableFundsPerc: 100, availableFunds: state.cash, buyAmount: 0, purchasePerc: 0 
    })
    const [allowBuy, setAllowBuy] = useState<boolean>(false)
    const [buyStyles, setBuyStyles] = useState<{[key: string]: string;}>({buyAmount: 'text-blue-500', shareCount: ''})

    useEffect(() => {
        if(purchaseAmount > state.cash) {
            setBuyStyles({
                buyAmount: 'text-blue-300',
                shareCount: 'text-red-500'
            })
        } else {
            setBuyStyles({
                buyAmount: 'text-blue-500',
                shareCount: ''
            })
        }

        setAllowBuy(purchaseAmount > 0);
    }, [purchaseAmount])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const buyAmount:number = Number(e.target.value)
        const difference:number = Math.ceil(buyAmount / state.cash * 100)
        const noOfShares:number = buyAmount / stockPrice

        setPurchaseAmount(buyAmount)

        setPurchase({
            noOfShares: Number(noOfShares.toFixed(4)),
            availableFundsPerc: Number((100 - difference).toFixed(0)),
            buyAmount: buyAmount,
            availableFunds: state.cash - buyAmount,
            purchasePerc: difference
        })
    }

    const handleBuy = () => {
        if(purchaseAmount > state.cash) {
            alert("IRL app allows overleveraging")
            return
        }

        // Set up some sort of user array of stock portfolio

    } 

    const lines = '|||'
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
                    <div>
                        <div>
                            <Doughnut 
                                availableFundsPerc = {purchase.availableFundsPerc}
                                purchaseFundsPerc = {purchase.purchasePerc}
                            />
                        </div>                        
                    </div>
                    <div className="grid grid-rows-2 justify-self-end">
                        <div><h1 className={`text-bold text-4xl ${buyStyles.buyAmount}`}>&pound;{purchase.buyAmount}</h1></div>
                        <div className={buyStyles.shareCount}>{purchase.noOfShares} of shares</div>
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
                        className={`w-full h-2 bg-gray-200 appearance-none cursor-pointer 
                            [&::-webkit-slider-runnable-track]:bg-blue-100 
                            [&::-webkit-slider-thumb]:appearance-none 
                            [&::-webkit-slider-thumb]:w-8 
                            [&::-webkit-slider-thumb]:h-8 
                            [&::-webkit-slider-thumb]:bg-blue-500  
                            [&::-moz-range-track]:bg-blue-500 
                            [&::-moz-range-thumb]:w-8 
                            [&::-moz-range-thumb]:h-8 
                            [&::-moz-range-thumb]:bg-blue-500 
                            [&::-moz-range-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:relative              
                            [&::-webkit-slider-thumb::before]:content-[${lines}]
                            [&::-webkit-slider-thumb::before]:relative
                            [&::-webkit-slider-thumb::before]:text-white
                            [&::-webkit-slider-thumb::before]:text-sm
                            [&::-webkit-slider-thumb::before]:left-1/2
                            [&::-webkit-slider-thumb::before]:top-1/2
                            [&::-webkit-slider-thumb::before]:-translate-x-1/2
                            [&::-webkit-slider-thumb::before]:-translate-y-1/2`
                        }
                                />
                </div>
                <div>
                    <button
        onClick={handleBuy}
        className={`${allowBuy ? 'hover:cursor-pointer hover:bg-blue-600 bg-blue-500' : 'disabled:cursor-not-allowed disabled:bg-gray-400 bg-gray-400'}  w-full md:w-auto font-bold px-4 py-2 text-white rounded-full w-auto mt-2`}
        >
            Review order
        </button>
                </div>
            </div>
        </div>
    </>
    )
}

export default BuyStock