// Dumb component for the user "Bank Account"
import { CurrencyPoundIcon } from "@heroicons/react/24/outline"

type AccountProps = {
    accountValue: string
    cash: string
    investments: string
    manageFunds: () => void
}

const AccountUI = ({accountValue, cash, investments, manageFunds}: AccountProps) => {
    return (
    <div className="grid grid-cols-2 h-fit">
        <div className="trading212-bg p-3 rounded-2xl h-full">
            <div className="text-xs">ACCOUNT VALUE</div>
            <h1 className="text-bold text-3xl">{accountValue}</h1>
        </div>
        <div className="grid grid-rows-2 text-right">
            <div className="trading212-bg ml-3 mb-3 p-3 rounded-2xl text-left h-fit grid grid-cols-2">
                <div>
                    <div className="text-xs">CASH</div>
                    <div>{cash}</div>
                </div>
                <div className="flex justify-self-end">
                    <button
                        onClick={manageFunds}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                            w-8 h-8 rounded-full flex justify-center items-center hover:cursor-pointer"
                        aria-label="Add item">
                        <CurrencyPoundIcon className="h-6 w-6" />
                    </button>
                </div>           
            </div>
            <div className="trading212-bg ml-3 p-3 rounded-2xl text-left h-fit"><div className="text-xs">INVESTMENTS</div> {investments}</div>
        </div>        
    </div>
    )
}

export default AccountUI