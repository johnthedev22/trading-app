type FormatParams = {
    amount: number
    locale?: string
    currencyCode?: string
}

export const formatCurrency = ({amount, locale = "en-US", currencyCode = "GBP"}: FormatParams) => {
    const formattedCurrency: string = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    }).format(amount); 

    return formattedCurrency
}
 