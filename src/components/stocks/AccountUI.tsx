// Dumb component for the user "Bank Account"
import { CurrencyPoundIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline"
import { useTheme } from "../../hooks/useTheme"
import AccountValueChart from "./AccountValueChart"

type AccountProps = {
    accountValue: string
    cash: string
    investments: string
    handleOnClick: (report: string) => void
}

const AccountUI = ({accountValue, cash, investments, handleOnClick}: AccountProps) => {
    const { state } = useTheme()

    const elementClasses:string = state.theme.length > 0 ? 'trading212-bg' : 'bg-blue-100'

    return (
    <div className="grid grid-cols-2 h-fit">
        <div className={`${elementClasses} p-3 rounded-2xl h-full`}>
            <div className="grid grid-rows-2">
                <div>
                   <div className="text-xs">ACCOUNT VALUE</div>
                    <h1 className="text-bold text-3xl">{accountValue}</h1> 
                </div>
                <div className="grid grid-cols-2 mt-3">
                    <div className="text-xs flex items-center justify-center">
                        <AccountValueChart />
                    </div>
                    <div className="text-left text-xs font-bold">
                        <div style={{color: 'green'}}>CASH</div>
                        <div  style={{color: 'lightgray'}}>HOLDINGS</div>
                    </div>
                </div>
            </div>
            
        </div>
        <div className="grid grid-rows-2 text-right">
            <div className={`${elementClasses} ml-3 mb-3 p-3 rounded-2xl text-left h-fit grid grid-cols-2`}>
                <div>
                    <div className="text-xs">CASH</div>
                    <div>{cash}</div>
                </div>
                <div className="flex justify-self-end">
                    <button
                        onClick={()=>handleOnClick('funds')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                            w-8 h-8 rounded-full flex justify-center items-center hover:cursor-pointer"
                        aria-label="Add item">
                        <CurrencyPoundIcon className="h-6 w-6" />
                    </button>
                </div>           
            </div>
            <div className={`${elementClasses} ml-3 p-3 rounded-2xl text-left h-fit grid grid-cols-2`}>
                <div>
                    <div className="text-xs">HOLDINGS</div> 
                    <div>{investments}</div> 
                </div>
                <div className="flex justify-self-end">
                    <button
                        onClick={investments !=='£0.00' ? ()=>handleOnClick('portfolio') : ()=>alert('No investments found')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                            w-8 h-8 rounded-full flex justify-center items-center hover:cursor-pointer"
                        aria-label="Add item">
                        <ArrowTrendingUpIcon className="h-6 w-6" />
                    </button>
                </div> 
            </div>
        </div>        
    </div>
    )
}

export default AccountUI