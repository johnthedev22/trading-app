//Dumb component where a user can withdraw or deposit funds here 
import { useState, type ChangeEvent } from "react"
import { useTheme } from "../../hooks/useTheme"
import type { Action } from "../../types/account.types"
import { formatCurrency } from "../../helpers/formatCurrency"

type FundsProps = {
    cash: number
    dispatch: React.Dispatch<Action>
    depositOnly?: boolean
    fundsToDeposit?: number
}

const ManageFunds = ({cash, dispatch, depositOnly = false, fundsToDeposit = 0}: FundsProps) => {
    const [amount, setAmount] = useState<number>(fundsToDeposit)

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
            case true: dispatch({type:"DEPOSIT", amount: amount})
                break;
            case false: dispatch({type:"WITHDRAW", amount: amount})
                if(amount > cash) {
                    alert("You can only withdraw £"+cash)
                    dispatch({type:"RESETALERT"})
                }
                break;
        }
    }

    return (
    <div className="dark:text-white">
        <div><h1 className="text-bold text-3xl">Cash: {formatCurrency({amount: cash})}</h1></div>
        <div>
            <input value={amount} onChange={handleChange}className={`border ${inputFieldClasses} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-full`} type="number" id="amount" placeholder="Enter amount in pounds"/>
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