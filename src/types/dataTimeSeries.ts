// Setting the ts types for the api data
export type TimeSeries = {
  //[title: string]: { // eg: "Time Series (Daily)"
    [date: string]: { // eg: "2025-09-19"
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  //};
};
