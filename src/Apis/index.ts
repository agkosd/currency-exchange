import axios, { AxiosResponse } from 'axios';
import { Symbols, LatestRates, CurrencyConversion } from './types';

const axiosInstance = axios.create({
  baseURL: 'https://api.exchangeratesapi.io/v1',
});

const accessKey = `${process.env.REACT_APP_API_KEY}`;

const body = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axiosInstance.get(url).then(body),
};

export const CurrencyApi = {
  getSymbols: (): Promise<Symbols> =>
    requests.get(`/symbols?access_key=${accessKey}`),
  getLatestRates: (base: string, symbols: string): Promise<LatestRates> =>
    requests.get(
      `/latest?access_key=${accessKey}&base=${base}&symbols=${symbols}`,
    ),
  convertCurrency: (
    from: string,
    to: string,
    amount: number,
  ): Promise<CurrencyConversion> =>
    requests.get(
      `/convert?access_key=${accessKey}&from=${from}&to=${to}&amount=${amount}`,
    ),
};
