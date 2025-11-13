type StockImageProps = {
    ticker: string
    doubleSize?: boolean
}

const StockIcon = ({ticker, doubleSize = false}: StockImageProps) => {
    const dim = doubleSize ? "w-[80px]" : "w-[40px]"
    return(<img src={`/images/stocks/${ticker}.png`} className={`${dim} border border-gray-800 rounded-xl`}/>)
}

export default StockIcon