import { CurrencyPoundIcon } from '@heroicons/react/24/outline';
import '../../styles/doughnut.css'
import { useState, useEffect } from 'react';

type DoughnutProps = {
    availableFundsPerc: number
    purchaseFundsPerc: number
}
const Doughnut = ({availableFundsPerc, purchaseFundsPerc}: DoughnutProps) => {
    const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>({
        background: `conic-gradient(green 0% ${availableFundsPerc}%, lightgray 0% ${purchaseFundsPerc}%)`,
    });
    const [throb, setThrob] = useState<string>("")

    useEffect(() => {
        if(purchaseFundsPerc <= 100) {
            if(throb.length > 0) setThrob("")
            setBackgroundStyle({
                background: `conic-gradient(green 0% ${availableFundsPerc}%, lightgray 0% ${purchaseFundsPerc}%)`,
            })
        } else {
            setThrob("animate-element")
            setBackgroundStyle({
                background: `conic-gradient(lightgray 0% ${100 + availableFundsPerc}%, red 0% ${purchaseFundsPerc}% )`,
            })
        }
        
    }, [availableFundsPerc, purchaseFundsPerc]);
    
    return(
    <button
        className={`${throb} relative bg-blue-500 hover:bg-blue-700 text-white font-bold 
            w-8 h-8 rounded-full flex justify-center items-center hover:cursor-pointer`}
        aria-label="Add item">
            <div className="absolute half-green-donut"
            style={{
                width: "47px",
                height: "47px",
                borderRadius: "50%",
                ...backgroundStyle,
            }}
        > </div> 
        <CurrencyPoundIcon className="h-6 w-6" />
    </button>
    )
}

export default Doughnut