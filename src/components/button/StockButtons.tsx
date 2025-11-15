// Buttons used to manage the stocks as shown in the StockItems component
import { ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"
import clsx from "clsx" //conditional class utility
import { sortObjectByTicker, sortObjectByDifference } from "../../helpers/stockSorts"
import type { StockDataTypeMap } from "../../types/stockItem.types"

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
    const [activeButton, setActiveButton] = useState<string>("sort_btn_watchlist")

    useEffect(() => {
        sortAction()
        
    }, [sortAsc, sortType]) // runs only after render, so it's safe

    const sortAction = () => {
        const sortedData = sortType === 'ticker'
        ? sortObjectByTicker(sortAsc, stockData)
        : sortObjectByDifference(sortAsc, stockData)

        returnSortedData(sortedData)
    }

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
    const [isHovered, setIsHovered] = useState<boolean>(false)
    
    const moveButtons = (direction: string) => {
        switch(direction) {
            case "left":
                setTranslateXValue(prevValue => prevValue - 100)
                break;
            default: 
                setTranslateXValue(prevValue => prevValue + 100)
                break;
        }
    }

    const chevronClass = "bg-blue-500 text-white"
    const isDarkMode = theme.length > 0
    
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
            <button className="h-full h-full hover:cursor-pointer" type="button" onClick={()=>moveButtons("right")}>
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
                .map((item) => {
                    const active = activeButton === 'sort_btn_'+item.id && 'bg-blue-500 text-white'
                    const buttonClass = `hover:cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'} rounded-xl p-2 ml-1 inline-block ${active}`
                    return (<button
                    //ref={(el) => { if (el) buttonRefs.current[id] = el}}
                    className={buttonClass}
                    key={`sort_btn_${item.id}`}
                    onClick={() => {
                        setActiveButton(`sort_btn_${item.id}`)
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
            <button className="hover:cursor-pointer" type="button" onClick={()=>moveButtons("left")}>
                <ChevronRightIcon className="w-6 h-6"/>
            </button>}
        </div>   
    </div>
    )
}

export default StockButtons