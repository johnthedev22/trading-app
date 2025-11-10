import { useContext } from 'react'
import { StockContext, type StockContextType } from '../context/StockContext';

export const useStock = (): StockContextType => {
  const context = useContext(StockContext);

  if (!context) {
    throw new Error("useStock must be used within a StockProvider");
  }

  return context;
};