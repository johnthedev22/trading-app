import React, { createContext, useReducer } from "react"

// Define the shape of your state
type State = {
  theme: string
}

// Define the possible actions
type Action = { type: "dark" } | { type: "light" }

// Reducer function to update state based on actions
const themeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "dark":
      return { theme: "dark:bg-black text-white" }
    case "light":
      return { theme: "" }
    default:
      return state
  }
}

// Create context type
export type ThemeContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

// Create context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, { theme: "dark:bg-black text-white" })

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}
