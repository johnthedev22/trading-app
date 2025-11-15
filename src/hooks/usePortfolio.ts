import { useContext } from 'react'
import { PortfolioContext, type PortfolioContextType } from '../context/PortfolioContext';

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }

  return context;
};