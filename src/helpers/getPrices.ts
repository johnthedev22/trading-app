import type { TimeSeries } from "../types/dataTimeSeries"

// This function is used as part of the getData api call and compares the x.close to y.close prices
export const getClosePrices = (chartData: TimeSeries): {prevClose: number; close: number} => {
    const timeSeries = chartData;
    const dates = Object.keys(timeSeries).sort((a, b) => (a < b ? 1 : -1)); // descending sort

    const lastDate = dates[0];
    const prevDate = dates[1];

    const lastClose = parseFloat(timeSeries[lastDate]["4. close"]);
    const prevClose = parseFloat(timeSeries[prevDate]["4. close"]);

    return { prevClose: prevClose, close: lastClose };
}

// Helper to handle ui effects for x.close and y.close price differences
export const checkDifference = (a: number, b: number, sortCall: boolean = false): {color: string; percDifference: number; difference: number; arrow: string} => {
    const percDifference = sortCall 
    ? Number((((a - b) /b) * 100).toFixed(2)) // When sorting, we need the calling function to know if the return is negative
    : Math.abs(Number((((a - b) /b) * 100).toFixed(2)))
    const difference = Math.abs(Number((a - b).toFixed(2)))
    const color = difference === 0 ? "" : a < b ? "#fc4949" : a === b ? "white" : "#57d54c"
    const arrow = difference === 0 ? "" : a < b ? "↘" : a === b ? "" : "↗"

    return {color: color, percDifference: percDifference, difference: difference, arrow}
}