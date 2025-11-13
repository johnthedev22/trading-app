// Buttons used to manage the stocks as shown in the StockItems component
import { ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline"
import { useState, useEffect, useRef } from "react"
import clsx from "clsx"; //conditional class utility
import { sortObjectByTicker, sortObjectByDifference } from "../../helpers/stockSorts";
import type { StockDataTypeMap } from "../../types/stockItem.types";
import { IdentificationIcon } from "@heroicons/react/16/solid";

type StockButtonProps = {
    stockData: StockDataTypeMap
    theme: string
    returnSortedData: (retData: StockDataTypeMap) => void
}

type StockButtonsType = {
    title: string 
    id: string
    show: boolean
    onClick: (args?:string) => void
}

const StockButtons = ({stockData, theme, returnSortedData}: StockButtonProps) => {
    const [sortAsc, setSortAsc] = useState<boolean>(true)
    const [sortType, setSortType] = useState<string>("ticker")
    const buttonRefs = useRef<HTMLButtonElement[]>([]) // many buttons so ref is an array
    const [currentButton, setCurrentButton] = useState<number>()

    useEffect(()=>{
        if(currentButton) {
             if(buttonRefs.current[currentButton]) buttonRefs.current[currentButton].focus()
        } else {
             if(buttonRefs.current[0]) buttonRefs.current[0].focus()
        }
       
    },[theme])
    useEffect(() => {
        const sortedData = sortType === 'ticker'
        ? sortObjectByTicker(sortAsc, stockData)
        : sortObjectByDifference(sortAsc, stockData);

        returnSortedData(sortedData);
    }, [sortAsc, sortType, stockData]);
 // runs only after render, so it's safe

    const handleSort = (type?: string) => {
        if(type === undefined) {
            alert("Demo button")
            return
        }
        setSortType(type)

        switch(type) {
            case "winners": setSortAsc(false)
            break;
            case "losers": setSortAsc(true)
            break;
            case "ticker": setSortAsc(prev => !prev)
            break;

        }
        
    }

    const initialStockButtons: StockButtonsType[] = [
        {
            title: "Holdings",
            id: "holdings",
            show: false, //show if we have actual holdings
            onClick: () =>handleSort()
        },
        {
            title: "Watch List",
            id: "watchlist",
            show: true,
            onClick: () => handleSort("ticker")
        },
        {
            title: "Winners",
            id: "winners",
            show: true,
            onClick: () => handleSort("winners")
        },
        {
            title: "Losers",
            id: "losers",
            show: true,
            onClick: () => handleSort("losers")
        },
        {
            title: "Global markets",
            id: "global",
            show: true,
            onClick: () => handleSort()
        },
        {
            title: "Most owned",
            id: "most",
            show: true,
            onClick: () => handleSort()
        },
    ]

    const [translateXValue, setTranslateXValue] = useState(0)
    //const [stockButtons, setStockButtons] = useState(initialStockButtons)
    const [isHovered, setIsHovered] = useState<boolean>(false)
    
    const shiftButtonsRight = (moveRight: boolean) => {
        switch(moveRight) {
            case false:
                setTranslateXValue(prevValue => prevValue - 100)
                break;
            default: 
                setTranslateXValue(prevValue => prevValue + 100)
                break;
        }
    }

    const chevronClass = "bg-blue-500 text-white"
    
    return (
    <div className="h-10 grid grid-cols-[5%_90%_5%] overflow-hidden mb-5"
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
    >
        <div 
            className={
                clsx("grid place-items-center h-full w-full z-10 transition-colors duration-200",
                isHovered && translateXValue !=0 && chevronClass)
            }>
            {isHovered && translateXValue !=0 && 
            <button className="h-full h-full hover:cursor-pointer" type="button" onClick={()=>shiftButtonsRight(true)}>
                <ChevronLeftIcon className="w-6 h-6"/>
            </button>}
        </div>
        <div className="overflow-hidden whitespace-nowrap">
            <div
                style={{ '--tx': `${translateXValue}px` } as React.CSSProperties}
                className="transform translate-x-[var(--tx)] will-change-transform transition-transform 
                duration-300 ease-in-out"
            >
                {initialStockButtons
                .filter((item) => item.show === true)
                .map((item, id) => {
                    return (<button
                    ref={(el) => { if (el) buttonRefs.current[id] = el;}}
                    className={`hover:cursor-pointer focus:bg-blue-500 focus:text-white rounded-xl p-2 ml-1 inline-block`}
                    key={item.id}
                    onClick={() => {
                        setCurrentButton(id)
                        item.onClick()
                    }}
                    >
                    {item.title}
                    </button>)
                })}
            </div>
        </div>
        {/* clsx used because the negated truthy expresion "!x &&" would inject false into theclassName, so clsx stops that*/}
        <div 
            className={
                clsx("grid place-items-center h-full w-full z-10 transition-colors duration-200 ",
                isHovered && translateXValue > -200 && chevronClass)
            }>
            {isHovered && translateXValue > -200 && 
            <button className="hover:cursor-pointer" type="button" onClick={()=>shiftButtonsRight(false)}>
                <ChevronRightIcon className="w-6 h-6"/>
            </button>}
        </div>   
    </div>
    )
}

export default StockButtons