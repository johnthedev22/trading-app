// A single stock item
import { useReducer, createContext } from "react"
import type { StockDataType } from "../types/stockItem.types"

type Action = {
    title: string
    ticker: string
    prevClose: number 
    close: number
}

const stockReducer = (state: StockDataType, action: Action): StockDataType => {
    return {
        ...state,
        ...action
    }
}

export type StockContextType = {
    state: StockDataType,
    dispatch: React.Dispatch<Action>
}

export const StockContext = createContext<StockContextType | undefined>(undefined)

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(stockReducer, { 
        title: "Apple",
        ticker: "AAPL",
        prevClose: 0,
        close: 0       
    })

    return (
        <StockContext.Provider value={{ state, dispatch }}>
            {children}
        </StockContext.Provider>
    )
}

