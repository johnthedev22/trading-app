import { useReducer, createContext } from "react"
import type { PortfolioState } from "../types/stockItem.types"
import type { Action } from "../types/portfolioAction.types";


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
            };*/

        case "REMOVE_STOCK":
            const newState = { ...state };
            delete newState[action.payload.ticker][action.payload.orderID];
            return newState;
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

