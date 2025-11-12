import type { TimeSeries } from "../types/dataTimeSeries"

export const getClosePrices = (chartData: TimeSeries): {prevClose: number; close: number} => {
    const timeSeries = chartData;
    const dates = Object.keys(timeSeries).sort((a, b) => (a < b ? 1 : -1)); // descending sort

    const lastDate = dates[0];
    const prevDate = dates[1];

    const lastClose = parseFloat(timeSeries[lastDate]["4. close"]);
    const prevClose = parseFloat(timeSeries[prevDate]["4. close"]);

    return { prevClose: prevClose, close: lastClose };
}

export const checkDifference = (a: number, b: number, sortCall: boolean = false): {color: string; percDifference: number; difference: number, arrow: string} => {
    const color = a < b ? "#fc4949" : (a === b) ? "text-white" : "#57d54c"
    const arrow = a < b ? "↘" : a === b ? "" : "↗"
    const percDifference = sortCall 
    ? Number((((a - b) /b) * 100).toFixed(2)) // When sorting, we need the calling function to know if the return is negative
    : Math.abs(Number((((a - b) /b) * 100).toFixed(2)))
    const difference = Math.abs(Number((a - b).toFixed(2)))

    return {color: color, percDifference: percDifference, difference: difference, arrow}
}