export type Action = 
    | { type: "DEPOSIT"; amount: number } 
    | { type: "WITHDRAW"; amount: number } 
    | { type: "BUY"; amount: number } 
    | { type: "SELL"; amount: number }
    | { type: "RESETALERT"; }