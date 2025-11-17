import type { PortfolioState, OrderData } from "../types/stockItem.types"

// Define the possible actions
export type Action =
  | { type: "ADD_STOCK"; payload: { orderID: number; ticker: string; data: OrderData } }
  | { type: "UPDATE_STOCK"; payload: { orderID: string; ticker: string; data: Partial<PortfolioState[string]> } }
  | { type: "REMOVE_STOCK"; payload: { orderID: number; ticker: string } };