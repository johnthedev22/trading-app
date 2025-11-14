import '../../styles/doughnut.css'
import { useState, useEffect } from 'react';
import DoughnutUI from '../../components/stocks/Doughnut';

type DoughnutProps={
    globals: {
        cash: number 
        dispatch: any
    } // smart components can import global states but the parent already has so receive it from the parent
    availableFundsPerc: number
    purchaseAmountPerc: number
    purchaseAmount: number
}
const Doughnut = ({globals, availableFundsPerc, purchaseAmountPerc, purchaseAmount}: DoughnutProps) => {
    const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>({
        background: `conic-gradient(green 0% ${availableFundsPerc}%, lightgray 0% ${purchaseAmountPerc}%)`,
    });
    const [throb, setThrob] = useState<string>("")

    useEffect(() => {
        if(purchaseAmountPerc <= 100) {
            if(throb.length > 0) setThrob("")
            setBackgroundStyle({
                background: `conic-gradient(green 0% ${availableFundsPerc}%, lightgray 0% ${purchaseAmountPerc}%)`,
            })
        } else {
            setThrob("animate-element")
            setBackgroundStyle({
                background: `conic-gradient(lightgray 0% ${100 + availableFundsPerc}%, red 0% ${purchaseAmountPerc}% )`,
            })
        }
        
    }, [availableFundsPerc, purchaseAmountPerc])
    
    return(
    <DoughnutUI globals={globals} throb={throb} backgroundStyle={backgroundStyle} purchaseAmount={purchaseAmount}/>
    )
}

export default Doughnut