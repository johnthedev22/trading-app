import { createContext, useReducer } from "react"

// define the state
type State = {
    cash: number
    accountValue: number //derived value
    investments: number
    userAlert?: string    
}

// define the action
type Action = 
    | { type: "DEPOSIT"; amount: number } 
    | { type: "WITHDRAW"; amount: number } 
    | { type: "BUY"; amount: number } 
    | { type: "SELL"; amount: number }
    | { type: "RESETALERT"; }

const accountReducer = (state: State, action: Action): State => {
    let newCash = state.cash
    let newInvestments = state.investments

    switch(action.type) {
        case "RESETALERT": return {
            ...state,
            userAlert: ""
        }
        case "DEPOSIT":
            newCash = state.cash + action.amount
            break;
        case "WITHDRAW":
            if(action.amount > state.cash) {
                return {
                    ...state,
                    userAlert: `You cannot withdraw more than ${state.cash}`
                }
            }

            newCash = state.cash - action.amount
            break;          
        case "BUY":
            if(action.amount > state.cash) {
                state.userAlert = `You cannot buy more than ${state.cash}`
                return state
            }

            newCash = state.cash - action.amount
            newInvestments = state.investments + action.amount
            break;
        case "SELL":
            newCash = state.cash + action.amount
            newInvestments = state.investments - action.amount
            break;
        default: return state
    }

    const newAccountValue = newCash + newInvestments 

    return {
        ...state,
        cash: newCash,
        accountValue: newAccountValue,
        investments: newInvestments
    }
}

// create context type
export type AccountContextType = {
    state: State
    dispatch: React.Dispatch<Action>
}

// create the context
export const AccountContext = createContext<AccountContextType | undefined>(undefined);

// create the provider component
export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, { 
        cash: 25000,
        accountValue: 25000,
        investments: 0
        
    })

    return (
        <AccountContext.Provider value={{ state, dispatch }}>
            {children}
        </AccountContext.Provider>
    );
};