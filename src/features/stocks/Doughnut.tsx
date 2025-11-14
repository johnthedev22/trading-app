import '../../styles/doughnut.css'
import DoughnutUI from '../../components/stocks/Doughnut';
import type { Action } from '../../types/account.types'

type DoughnutProps = {
  globals: {
    cash: number;
    dispatch: React.Dispatch<Action>;
  };
  availableFundsPerc: number;
  purchaseAmountPerc: number;
  purchaseAmount: number;
};

const Doughnut = ({
  globals,
  availableFundsPerc,
  purchaseAmountPerc,
  purchaseAmount
}: DoughnutProps) => {

  const over = purchaseAmountPerc > 100;

  const backgroundStyle: React.CSSProperties = !over
    ? {
        background: `conic-gradient(
          green 0% ${availableFundsPerc}%,
          lightgray ${availableFundsPerc}% 100%
        )`
      }
    : {
        background: `conic-gradient(
          lightgray 0% ${100 + availableFundsPerc}%,
          red ${availableFundsPerc}% ${purchaseAmountPerc}%
        )`
      };

  const throb = over ? "animate-element" : "";

  return (
    <DoughnutUI
      globals={globals}
      throb={throb}
      backgroundStyle={backgroundStyle}
      purchaseAmount={purchaseAmount}
    />
  );
};

export default Doughnut;
