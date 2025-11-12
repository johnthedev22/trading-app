import { useReducer, createContext } from "react"
import type { StockDataType } from "../types/stockItem.types"

type Action = {
    type: "SET"
    title: string
    tickerSymbol: string
}

const stockReducer = (state: StockDataType, action: Action): StockDataType => {
    switch (action.type) {
        case "SET": return {
            ...state,
            title: action.title,
            ticker: action.tickerSymbol
        }
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

