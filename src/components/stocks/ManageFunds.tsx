//Dumb component where a user can withdraw or deposit funds here 
import { useState, type ChangeEvent } from "react"
import { useTheme } from "../../hooks/useTheme"
import type { Action } from "../../types/account.types"
import { formatCurrency } from "../../helpers/formatCurrency"

type FundsProps = {
    cash: number
    dispatch: React.Dispatch<Action>
    depositOnly?: boolean
    fundsToDeposit?: number | string
    closeOnAction: () => void
}

const ManageFunds = ({cash, dispatch, depositOnly = false, fundsToDeposit = "", closeOnAction}: FundsProps) => {
    const [amount, setAmount] = useState<number | string>(fundsToDeposit)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        //cast the string back to a number
        //setAmount(+e.target.value)
        setAmount(Number(e.target.value)) // removed format in the parent
    }

    const { state } = useTheme()

    const inputFieldClasses = state.theme.length > 0 
    ? "border-orange-500 text-white"
    : "border-blue-500"

    //Updates the global state
    const fundAction = (deposit: boolean) => {
        switch(deposit) {
            case true: dispatch({type:"DEPOSIT", amount: +amount})
                break;
            case false: dispatch({type:"WITHDRAW", amount: +amount})
                if(+amount > cash) {
                    alert("You can only withdraw £"+cash)
                    dispatch({type:"RESETALERT"})
                }
                break;
        }
        closeOnAction()
    }

    const elementClasses:string = state.theme.length > 0 ? 'trading212-bg' : 'bg-blue-100'

    return (
    <div className="dark:text-white">
        <div className={`${elementClasses} ml-3 mb-3 p-3 rounded-2xl text-left h-fit grid grid-cols-2`}>
            <div>
                <div className="text-xs">CASH</div>
                <div><h1 className="text-bold text-3xl">{formatCurrency({amount: cash})}</h1></div>
            </div>
        </div>
        <div className={`${elementClasses} ml-3 mb-3 p-3 rounded-2xl text-left h-fit grid grid-cols-2`}>
            <div>
                <div className="text-xs">{depositOnly ? <>DEPOSIT</> : <>AMOUNT</>}</div>
                <div><h1 className="text-bold text-3xl">{formatCurrency({amount: +amount})}</h1></div>
            </div>
        </div>
        <div>
            <input value={amount} step="0.01" onChange={handleChange}className={`border ${inputFieldClasses} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-full`} type="number" id="amount" placeholder="Enter amount in pounds"/>
        </div>
        <button
        onClick={()=>fundAction(true)}
        className="hover:cursor-pointer w-full md:w-auto font-bold px-4 py-2 text-white bg-blue-500 rounded-full w-auto mt-2 hover:bg-blue-600"
        >
            Deposit
        </button>
        {!depositOnly && <button
        onClick={()=>fundAction(false)}
        className="hover:cursor-pointer w-full md:w-auto font-bold px-4 py-2 text-white bg-red-500 rounded-full w-auto mt-2 hover:bg-red-600"
        >
        Withdraw
        </button>}
    </div>
    )
}

export default ManageFunds