//buttons used to manage the stocks as shown in the StockItems component
import { ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"
import clsx from "clsx"; //conditional class utility
import { sortObjectByTicker, sortObjectByDifference } from "../../helpers/stockSorts";
import type { StockDataTypeMap } from "../../types/stockItem.types";

type StockButtonProps = {
    stockData: StockDataTypeMap
    returnSortedData: (retData: StockDataTypeMap) => void
}

type StockButtonsType = {
    title: string 
    id: string
    show: boolean
    onClick: (args?:string) => void
}

const StockButtons = ({stockData, returnSortedData}: StockButtonProps) => {
    const [sortAsc, setSortAsc] = useState<boolean>(true)
    const [sortType, setSortType] = useState<string>("ticker")

    useEffect(() => {
        const sortedData = sortType === 'ticker' ? sortObjectByTicker(sortAsc, stockData) : sortObjectByDifference(sortAsc, stockData)
        
        returnSortedData(sortedData)
    }, [sortAsc]) // runs only after render, so it's safe

    const handleSort = (type?: string) => {
        if(type === undefined) {
            alert("Demo button")
            return
        }
        setSortType(type)
        setSortAsc(prev => !prev)
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

    return (
    <div className="h-10 grid grid-cols-[5%_90%_5%] overflow-hidden mb-5"
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
    >
        <div 
            className={
                clsx("grid place-items-center h-full w-full z-10 transition-colors duration-200",
                isHovered && translateXValue !=0 && "bg-orange-500")
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
                .map((item) => (
                    <button
                    className="hover:cursor-pointer rounded-xl p-2 ml-1 trading212-bg rounded-half inline-block"
                    key={item.id}
                    onClick={() => item.onClick()}
                    >
                    {item.title}
                    </button>
                ))}
            </div>
        </div>
        {/* clsx used because the negated truthy expresion "!x &&" would inject false into theclassName, so clsx stops that*/}
        <div 
            className={
                clsx("grid place-items-center h-full w-full z-10 transition-colors duration-200 ",
                isHovered && translateXValue > -200 && "bg-orange-500")
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