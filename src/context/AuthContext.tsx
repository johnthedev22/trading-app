import React, { createContext, useReducer } from "react";

// Define the shape of your state
type State = {
  username: string
  isloggedin: boolean
};

// Define the possible actions
type Action = { type: "LOGIN" } | { type: "LOGOUT" }

// Reducer function to update state based on actions
const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { username: "Guest", isloggedin: true }
    case "LOGOUT":
      return { username: "", isloggedin: false }
    default:
      return state
  }
}

// Create context type
export type AuthContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { username: "", isloggedin: true })

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
