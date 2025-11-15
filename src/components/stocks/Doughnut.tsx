import '../../styles/doughnut.css'
import { CurrencyPoundIcon } from '@heroicons/react/24/outline'
import ManageFunds from './ManageFunds'
import Modal from '../modal/Modal'
import { useState } from 'react'
import type { Action } from '../../types/account.types'

type DoughnutProps={
    globals: {
        cash: number 
        dispatch: React.Dispatch<Action>
    } // dumb components should never import global state so passed as a prop
    purchaseAmount: number
    throb: string
    backgroundStyle: React.CSSProperties
}
const DoughnutUI = ({globals, throb, backgroundStyle, purchaseAmount}: DoughnutProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return(
    <>
        <button onClick={()=>setIsOpen(true)}
            className={`${throb} relative bg-blue-500 hover:bg-blue-700 text-white font-bold 
                w-8 h-8 rounded-full flex justify-center items-center hover:cursor-pointer`}
            aria-label="Add item">
                <div className="absolute half-green-donut z-0"
                style={{
                    width: "47px",
                    height: "47px",
                    borderRadius: "50%",
                    ...backgroundStyle,
                }}
            > </div> 
            <CurrencyPoundIcon className="h-6 w-6 z-10" />
        </button>
    
        <Modal title = "Deposit funds" isOpen={isOpen} onClose={()=>setIsOpen(false)}>
            <ManageFunds closeOnAction={()=>setIsOpen(false)} cash={globals.cash} depositOnly={true} fundsToDeposit={purchaseAmount} dispatch={globals.dispatch}/>
        </Modal>
    </> 
    )
}

export default DoughnutUI