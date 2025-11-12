// This filters the chart data depending on the values of the user from the main chart

type ChartPeriodType = {
    limit: number
    doModulus: boolean 
    series: string
}

// Processes the values of the "Chart period" modal
const chartPeriodModal = (period: number): number => {
    switch(period) {
        case 1: // Hours
            return 60 
        case 4: 
            return 240
    }

    return period
}

export const chartPeriod = (buttonValues: string, modalValues: number): ChartPeriodType => {
    const rowValue: number = chartPeriodModal(modalValues)
    let limit: number = 0
    let doModulus: boolean = false
    let series = "" // intra/daily/weekly etc

    // Default values before user makes changes to chart settings
    // Report types: 1D = 15 minutes, 1W = 30 minutes 7 days, 1M = 240 minutes 30 days, 
    // 3M = daily 3 months, 1Y = Weekly 12 months, XY = weekly all
    switch(buttonValues) {
        case "1D":
            limit = rowValue / 5 // return every x row (eg 5mins * 3 = 15mins , so 15/5)
            doModulus = true
            series = "intra"
            break;
        case "1W":
            limit = rowValue / 5
            doModulus = true
            series = "intra"
            break;
        case "1M":
            limit = rowValue / 5
            doModulus = true
            series = "intra"
            break;
        case "3M":
            series = "daily"
            break;
        case "1Y": 
            series = "weekly"
        break;
        case "MAX": 
            series = "monthly"
        break;
    }

    return {series: series, limit: limit, doModulus: doModulus}
}

