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

    useEffect(() => {
        if(purchaseFundsPerc <= 100) {
            setBackgroundStyle({
                background: `conic-gradient(green 0% ${availableFundsPerc}%, lightgray 0% ${purchaseFundsPerc}%)`,
            })
        } else {
            setBackgroundStyle({
                background: `conic-gradient(lightgray 0% ${100 + availableFundsPerc}%, red 0% ${purchaseFundsPerc}% )`,
            })
        }
        
    }, [availableFundsPerc, purchaseFundsPerc]);
    
    return(
    <div className="half-green-donut"
        style={{
            width: "47px",
            height: "47px",
            borderRadius: "50%",
            ...backgroundStyle,
        }}
        >
    </div>
    )
}

export default Doughnut