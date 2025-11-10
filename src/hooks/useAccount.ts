import { useContext } from 'react'
import { AccountContext, type AccountContextType } from '../context/AccountContext';

export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("useAccount must be used within a AccountProvider");
  }

  return context;
};