//Dumb component where a user can withdraw or deposit funds here 
import { useState, type ChangeEvent } from "react"
import { useTheme } from "../../hooks/useTheme"

type FundsProps = {
    cash: string //because the number is formatted into currency
    fundAction: (buy:boolean, amount: number) => void
}

const ManageFunds = ({cash, fundAction}: FundsProps) => {
    const [amount, setAmount] = useState<number>(0)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        //cast the string back to a number
        setAmount(+e.target.value)
    }

    const { state } = useTheme()

    const inputFieldClasses = state.theme.length > 0 
    ? "border-orange-500 text-white"
    : "border-blue-500"

    return (
    <div className="dark:text-white">
        <div>{cash}</div>
        <div>
            <input value={amount} onChange={handleChange}className={`border ${inputFieldClasses} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-full`} type="number" id="amount" placeholder="Enter amount in pounds"/>
        </div>
        <button
        onClick={()=>fundAction(true, amount)}
        className="hover:cursor-pointer w-full md:w-auto font-bold px-4 py-2 text-white bg-blue-500 rounded-full w-auto mt-2 hover:bg-blue-600"
        >
            Deposit
        </button>
        <button
        onClick={()=>fundAction(false, amount)}
        className="hover:cursor-pointer w-full md:w-auto font-bold px-4 py-2 text-white bg-red-500 rounded-full w-auto mt-2 hover:bg-red-600"
        >
        Withdraw
        </button>
    </div>
    )
}

export default ManageFunds