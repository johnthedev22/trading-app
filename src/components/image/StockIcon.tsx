type StockImageProps = {
    ticker: string
}

const StockIcon = ({ticker}: StockImageProps) => {
    return(<img src={`/images/stocks/${ticker}.png`} className="w-[40px] border border-gray-800 rounded-xl"/>)
}

export default StockIcon