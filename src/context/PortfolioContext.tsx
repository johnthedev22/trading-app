import { useReducer, createContext } from "react"
import type { PortfolioState, OrderData } from "../types/stockItem.types"

// Define the possible actions
type Action =
  | { type: "ADD_STOCK"; payload: { orderID: number; ticker: string; data: OrderData } }
  | { type: "UPDATE_STOCK"; payload: { orderID: string; ticker: string; data: Partial<PortfolioState[string]> } }
  | { type: "REMOVE_STOCK"; payload: { ticker: string } };


const portfolioReducer = (state: PortfolioState, action: Action): PortfolioState => {
    switch (action.type) {
        case "ADD_STOCK":
            return {
                ...state,
                [action.payload.ticker]: {
                    ...(state[action.payload.ticker] ?? {}),
                    [action.payload.orderID]: action.payload.data
                }
            };

        /*case "UPDATE_STOCK":
            return {
                ...state,
                [action.payload.ticker]: {
                    ...(state[action.payload.ticker] ?? {}),
                    [action.payload.orderID]: {
                        ...(state[action.payload.ticker]?.[action.payload.orderID] ?? {}),
                        ...action.payload.data
                    }
                }
            };

        case "REMOVE_STOCK":
            const newState = { ...state };
            delete newState[action.payload.ticker];
            return newState;*/

        default:
            return state;
    }
}


export type PortfolioContextType = {
    state: PortfolioState,
    dispatch: React.Dispatch<Action>
}

export const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(portfolioReducer, {})

    return (
        <PortfolioContext.Provider value={{ state, dispatch }}>
            {children}
        </PortfolioContext.Provider>
    )
}

