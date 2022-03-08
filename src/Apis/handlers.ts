/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { rest } from 'msw';

const baseUrl = 'https://api.exchangeratesapi.io/v1';

const mockSymbolsResponse = {
  success: true,
  symbols: {
    AED: 'United Arab Emirates Dirham',
    AFN: 'Afghan Afghani',
    ALL: 'Albanian Lek',
    AMD: 'Armenian Dram',
    GBP: 'British Pound Sterling',
    JPY: 'Japanese yen',
    EUR: 'Euro',
    USD: 'United States Dollar',
  },
};

const mockLatestResponse = {
  success: true,
  timestamp: 1519296206,
  base: 'USD',
  date: '2021-03-17',
  rates: {
    GBP: 0.72007,
    JPY: 107.346001,
    EUR: 0.813399,
  },
};

const mockConvertResponse = {
  success: true,
  query: {
    from: 'GBP',
    to: 'JPY',
    amount: 25,
  },
  info: {
    timestamp: 1519328414,
    rate: 148.972231,
  },
  historical: '',
  date: '2018-02-22',
  result: 3724.305775,
};

const getSymbolsPath = `${baseUrl}/symbols`;
const getLatestRatesPath = `${baseUrl}/latest`;
const getConvertPath = `${baseUrl}/convert`;

const symbolsHandler = rest.get(getSymbolsPath, async (req, res, ctx) => {
  return res(ctx.json(mockSymbolsResponse));
});

export const symbolsExceptionHandler = rest.get(
  getSymbolsPath,
  async (req, res, ctx) => {
    console.log('inside error');
    return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
  },
);

const latestRatesHandler = rest.get(
  getLatestRatesPath,
  async (req, res, ctx) => {
    return res(ctx.json(mockLatestResponse));
  },
);

export const latestRatesExceptionHandler = rest.get(
  getLatestRatesPath,
  async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal Server Error' })),
);

export const convertHandler = rest.get(getConvertPath, async (req, res, ctx) =>
  res(ctx.json(mockConvertResponse)),
);

export const convertExceptionHandler = rest.get(
  getConvertPath,
  async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal Server Error' })),
);

export const handlers = [symbolsHandler, latestRatesHandler, convertHandler];
