import { useEffect, useState } from "react";
import { useStock } from "../../hooks/useStock";
import type { StockDataType } from "../../types/stockItem.types";

type StockItemProps = {
  allStockData: StockDataType[];
};

const StockItemMain = ({ allStockData }: StockItemProps) => {
  const { state: data } = useStock();
  const { title, tickerSymbol: symbol } = data;
  const [stock, setStock] = useState<StockDataType[]>([]);

  useEffect(() => {
    const filtered = allStockData.filter(item => item.tickerSymbol.trim() === symbol.trim());
    setStock(filtered);
  }, [allStockData, symbol]);

  return (
    <div className="text-white">
      {title}, {symbol}
    </div>
  );
};

export default StockItemMain;
