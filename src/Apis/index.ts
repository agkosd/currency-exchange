import axios, { AxiosResponse } from 'axios';
import { Symbols, LatestRates, CurrencyConversion } from './types';

const axiosInstance = axios.create({
  baseURL: 'https://api.exchangeratesapi.io/v1',
});

axiosInstance.interceptors.request.use(config => {
  config.params = config.params || {};
  config.params.access_key = `${process.env.ACCESS_KEY}`;
  return config;
});

const body = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axiosInstance.get(url).then(body),
};

export const CurrencyApi = {
  getSymbols: (): Promise<Symbols> => requests.get('/symbols'),
  getLatestRates: (base: string, symbols: string): Promise<LatestRates> =>
    requests.get(`/latest&base=${base}&symbols=${symbols}`),
  convertCurrency: (
    from: string,
    to: string,
    amount: number,
  ): Promise<CurrencyConversion> =>
    requests.get(`/convert/&from=${from}&to=${to}&amount=${amount}`),
};
